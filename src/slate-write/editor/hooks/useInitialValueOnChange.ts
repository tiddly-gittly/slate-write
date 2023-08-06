import { usePlateActions, usePlateEditorRef, useResetPlateEditor } from '@udecode/plate-core';
import { TElement, TNode } from '@udecode/slate';
import useDebouncedCallback from 'beautiful-react-hooks/useDebouncedCallback';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { ReactEditor } from 'slate-react';

import { deserialize, serialize } from '../../transform/serialize';
import type { ISaver } from '../editor';

interface IUseInitialValueOnChangeContext {
  editorID: string;
  idCreator: () => string;
  initialTiddlerText: string;
  saver: ISaver;
}
export function useInitialValue(context: IUseInitialValueOnChangeContext) {
  const { initialTiddlerText, idCreator } = context;
  // Add the initial value when setting up our state.
  const currentAstReference = useRef<TElement[]>(deserialize(initialTiddlerText, { idCreator }));
  return currentAstReference;
}

export function useOnChange(context: IUseInitialValueOnChangeContext & { currentAstReference: MutableRefObject<TElement[]> }) {
  const { editorID, initialTiddlerText, saver: { onSave, interval, lock }, idCreator, currentAstReference } = context;
  const setOnChange = usePlateActions(editorID).onChange();
  const resetEditor = useResetPlateEditor(editorID);
  const editorReference = usePlateEditorRef(editorID);
  const setValue = usePlateActions(editorID).value();
  /** current text is only used for compare, we don't want it trigger rerender, so use ref to store it */
  const currentTextReference = useRef<string>(initialTiddlerText);

  // update current value from props
  useEffect(() => {
    // there will be cases that triple return replaced with double return (trim),  cause here rerender, but I think it is ok, not so frequent
    if (currentTextReference.current !== initialTiddlerText) {
      currentTextReference.current = initialTiddlerText;
      const newValue = deserialize(initialTiddlerText, { idCreator });
      currentAstReference.current = newValue;
      // reset selection, so if you delete wikitext, selection won't goto some empty space and cause error
      resetEditor();
      setValue(newValue);
    }
  }, [initialTiddlerText, currentTextReference, setValue, resetEditor, idCreator, currentAstReference]);
  const saver = useCallback(
    (newValue: TNode[]) => {
      const newText = serialize(newValue);
      onSave(newText);
      currentTextReference.current = newText;
    },
    [onSave],
  );
  const debouncedSaver = useDebouncedCallback(saver, [saver], interval);

  const onChange = useCallback(
    (newValue: TElement[]) => {
      if (currentAstReference.current === newValue) return;
      currentAstReference.current = newValue;
      // check isComposing and if user is just set_selection
      if (editorReference === null || ReactEditor.isComposing(editorReference as ReactEditor)) {
        return;
      }
      if (editorReference.operations.every((op) => op.type === 'set_selection')) {
        return;
      }
      lock();
      debouncedSaver(newValue);
    },
    [currentAstReference, debouncedSaver, editorReference, lock],
  );
  useEffect(() => {
    setOnChange({
      fn: onChange,
    });
  }, [onChange, setOnChange]);

  useEffect(() => {
    // reset selection, so if you delete wikitext, selection won't goto some empty space and cause error
    // resetEditor();
    // this only work as didMount
    return () => {
      // emergency save on close or switch to edit or readonly
      saver(currentAstReference.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
