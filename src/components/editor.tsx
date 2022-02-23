import React, { useState } from 'react';
import { createEditor, BaseEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { useDebouncedCallback } from 'beautiful-react-hooks';
import { serialize } from 'src/transform/serialize';

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
export type ParagraphElement = {
  type: 'paragraph';
  children: CustomText[];
};
export type HeadingElement = {
  type: 'heading';
  level: number;
  children: CustomText[];
};
export type CustomElement = ParagraphElement | HeadingElement;
export type FormattedText = { text: string; bold?: true };
export type CustomText = FormattedText;
declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export interface IEditorAppProps {
  saver: {
    onSave: (value: string) => void;
    /** ms about debounce how long between save */
    interval?: number;
  };
}
export function EditorApp(props: IEditorAppProps) {
  const [editor] = useState(() => withReact(createEditor()));
  // Add the initial value when setting up our state.
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);
  const onSave = useDebouncedCallback(
    (newValue: Descendant[]) => {
      const isAstChange = editor.operations.some(
        op => 'set_selection' !== op.type
      )
      if (isAstChange) {
        props.saver.onSave(serialize(newValue));
      }
    },
    [props.saver.onSave, editor],
    props.saver.interval,
  );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        onSave(newValue);
      }}>
      <Editable />
    </Slate>
  );
}
