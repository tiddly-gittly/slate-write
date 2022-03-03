import React, { useCallback, useState } from 'react';
import { createEditor, BaseEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor, RenderElementProps } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { useDebouncedCallback } from 'beautiful-react-hooks';
import { serialize } from 'src/transform/serialize';
import { fromWikiText } from 'src/transform/wikiast-util-from-wikitext';
import { wikiAstToSlateAst } from 'src/transform/wikiast-util-to-slateast';

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
export interface CustomRenderElement {
  children: CustomText[];
  /** this can be `echarts` or `mermaid` */
  type: string;
}
export interface ElementElement {
  children: CustomText[];
  tag: string;
  type: 'element';
}
export type CustomElement = CustomRenderElement | ElementElement;
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
  initialText: string;
  saver: {
    /** ms about debounce how long between save */
    interval?: number;
    onSave: (value: string) => void;
  };
}
export function EditorApp(props: IEditorAppProps): JSX.Element {
  const [editor] = useState(() => withReact(createEditor()));
  // Add the initial value when setting up our state.
  const initialAst = wikiAstToSlateAst(fromWikiText(props.initialText));
  const [value, setValue] = useState<Descendant[]>(initialAst as Descendant[]);
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

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props: RenderElementProps): JSX.Element => {
    switch (props.element.type) {
      case 'element':
        return <ElementRender {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        onSave(newValue);
      }}>
      <Editable renderElement={renderElement} />
    </Slate>
  );
}

const ElementRender = (props: RenderElementProps): JSX.Element => {
  const { tag: HtmlTag } = props.element as ElementElement;
  return <HtmlTag {...props.attributes}>{props.children}</HtmlTag>;
};
const DefaultElement = (props: RenderElementProps): JSX.Element => {
  return <p {...props.attributes}>{props.children}</p>;
};
