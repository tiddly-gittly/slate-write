import React, { useState } from 'react';
import { createEditor, BaseEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { useDebouncedCallback } from 'beautiful-react-hooks';
import { serialize } from 'src/transform/serialize';

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
export interface ParagraphElement {
  children: CustomText[];
  type: 'paragraph';
}
export interface HeadingElement {
  children: CustomText[];
  level: number;
  type: 'heading';
}
export type CustomElement = ParagraphElement | HeadingElement;
export interface FormattedText {
  bold?: true;
  text: string;
}
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
    /** ms about debounce how long between save */
    interval?: number;
    onSave: (value: string) => void;
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
      // TODO: this seems buggy, sometimes editor.operations is empty array... So I have to add `editor.operations.length === 0 ||`
      const isAstChange = editor.operations.length === 0 || editor.operations.some((op) => op.type !== 'set_selection');
      if (isAstChange) {
        const newText = serialize(newValue);
        props.saver.onSave(newText);
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
