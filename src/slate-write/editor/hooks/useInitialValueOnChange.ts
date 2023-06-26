import { usePlateActions, usePlateEditorRef, useResetPlateEditor } from '@udecode/plate-core';
import { TElement, TNode } from '@udecode/slate';
import useDebouncedCallback from 'beautiful-react-hooks/useDebouncedCallback';
import { useCallback, useEffect, useRef } from 'react';
import { ReactEditor } from 'slate-react';

import { deserialize, serialize } from '../../transform/serialize';
import type { ISaver } from '../editor';

interface IUseInitialValueOnChangeContext {
  editorID: string;
  idCreator: () => string;
  initialTiddlerText: string;
  saver: ISaver;
}
export function useInitialValueOnChange(context: IUseInitialValueOnChangeContext) {
  const { editorID, initialTiddlerText, saver: { onSave, interval, lock }, idCreator } = context;
  const resetEditor = useResetPlateEditor(editorID);
  const editorReference = usePlateEditorRef(editorID);
  const { value: updateEditorValue } = usePlateActions(editorID);

  // Add the initial value when setting up our state.
  const currentAstReference = useRef<TElement[]>(deserialize(initialTiddlerText, { idCreator }));
  /** current text is only used for compare, we don't want it trigger rerender, so use ref to store it */
  const currentTextReference = useRef<string>(initialTiddlerText);

  // update current value from props
  useEffect(() => {
    // there will be cases that triple return replaced with double return (trim),  cause here rerender, but I think it is ok, not so frequent
    if (currentTextReference.current !== initialTiddlerText) {
      const newValue = deserialize(initialTiddlerText, { idCreator });
      currentAstReference.current = newValue;
      // reset selection, so if you delete wikitext, selection won't goto some empty space and cause error
      resetEditor();
      updateEditorValue(newValue);
    }
  }, [initialTiddlerText, currentTextReference, updateEditorValue, resetEditor, idCreator]);
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
    [debouncedSaver, editorReference, lock],
  );

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

  return [currentAstReference, onChange] as const;
}
