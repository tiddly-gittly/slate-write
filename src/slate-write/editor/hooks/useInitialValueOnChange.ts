import { resetEditor, SlateEditor } from '@udecode/plate-common';
import { ValueOf } from '@udecode/slate';
import useDebouncedCallback from 'beautiful-react-hooks/useDebouncedCallback';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { ReactEditor } from 'slate-react';
import { deserialize, serialize } from '../../transform/serialize';
import type { ISaver } from '../editor';

interface IUseInitialValueOnChangeContext {
  idCreator: () => string;
  initialTiddlerText: string;
  saver: ISaver;
}
export function useInitialValue(context: IUseInitialValueOnChangeContext) {
  const { initialTiddlerText, idCreator } = context;
  // Add the initial value when setting up our state.
  const currentAstReference = useRef<ValueOf<SlateEditor>>(deserialize(initialTiddlerText, { idCreator }));
  return currentAstReference;
}

export function useOnChange(context: IUseInitialValueOnChangeContext & { currentAstReference: MutableRefObject<ValueOf<SlateEditor>>; editor: SlateEditor }) {
  const { initialTiddlerText, saver: { onSave, interval, lock }, idCreator, currentAstReference } = context;
  const editor = context.editor;
  /** current text is only used for compare, we don't want it trigger rerender, so use ref to store it */
  const currentTextReference = useRef<string>(initialTiddlerText);

  // update current value from props
  useEffect(() => {
    // there will be cases that triple return replaced with double return (trim the tiddler),  cause here rerender, but I think it is ok, not so frequent
    if (currentTextReference.current !== initialTiddlerText) {
      currentTextReference.current = initialTiddlerText;
      const newValue = deserialize(initialTiddlerText, { idCreator });
      currentAstReference.current = newValue;
      // reset selection, so if you delete wikitext, selection won't goto some empty space and cause error
      resetEditor(editor);
      editor.tf.setValue(newValue);
    }
  }, [initialTiddlerText, currentTextReference, idCreator, currentAstReference, editor]);
  const saver = useCallback(
    (newValue: ValueOf<SlateEditor>) => {
      const newText = serialize(newValue);
      onSave(newText);
      currentTextReference.current = newText;
    },
    [onSave],
  );
  const debouncedSaver = useDebouncedCallback(saver, [saver], interval);

  const onChange = useCallback(
    (options: { value: ValueOf<SlateEditor> }) => {
      const newValue = options.value;
      if (currentAstReference.current === newValue) return;
      currentAstReference.current = newValue;
      // check isComposing and if user is just set_selection
      if (editor === null || ReactEditor.isComposing(editor as unknown as ReactEditor)) {
        return;
      }
      if (editor.operations.every((op) => op.type === 'set_selection')) {
        return;
      }
      lock();
      debouncedSaver(newValue);
    },
    [currentAstReference, debouncedSaver, editor, lock],
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

  return onChange;
}
