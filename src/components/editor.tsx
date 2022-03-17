import React, { useCallback, useState, KeyboardEvent } from 'react';
import { createEditor, BaseEditor, Descendant } from 'slate';
import {
  AnyObject,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createHeadingPlugin,
  createItalicPlugin,
  createParagraphPlugin,
  createPlateUI,
  createPlugins,
  createStrikethroughPlugin,
  createUnderlinePlugin,
  Plate,
  TNode,
} from '@udecode/plate';
import { Slate, Editable, withReact, ReactEditor, RenderElementProps } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { useDebouncedCallback } from 'beautiful-react-hooks';

import { deserialize, serialize } from '../../src/transform/serialize';
import { HTMLTags } from 'tiddlywiki';

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
export interface CustomRenderElement {
  children: CustomText[];
  /** this can be `echarts` or `mermaid` */
  type: string;
}
export interface ElementElement {
  children: Array<CustomText | ElementElement>;
  tag: HTMLTags;
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
const plugins = createPlugins(
  [
    // elements
    createParagraphPlugin(), // paragraph element
    createBlockquotePlugin(), // blockquote element
    createCodeBlockPlugin(), // code block element
    createHeadingPlugin(), // heading elements

    // marks
    createBoldPlugin(), // bold mark
    createItalicPlugin(), // italic mark
    createUnderlinePlugin(), // underline mark
    createStrikethroughPlugin(), // strikethrough mark
    createCodePlugin(), // code mark
  ],
  {
    // Plate components
    components: createPlateUI(),
  },
);

export function EditorApp(props: IEditorAppProps): JSX.Element {
  // Add the initial value when setting up our state.
  const initialAst = deserialize(props.initialText);
  const onSave = useDebouncedCallback(
    (newValue: Array<TNode<AnyObject>>) => {
      const newText = serialize(newValue);
      props.saver.onSave(newText);
    },
    [props.saver.onSave],
    props.saver.interval,
  );

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  // const renderElement = useCallback((props: RenderElementProps): JSX.Element => {
  //   switch (props.element.type) {
  //     case 'element':
  //       return <ElementRender {...props} />;
  //     default:
  //       return <DefaultElement {...props} />;
  //   }
  // }, []);
  if (typeof document === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <Plate
      initialValue={initialAst}
      onChange={(newValue) => {
        onSave(newValue);
      }}
      plugins={plugins}>
      {props.initialText}
    </Plate>
  );
}

const ElementRender = (props: RenderElementProps): JSX.Element => {
  const { tag } = props.element as ElementElement;
  const HtmlTag = tag as keyof JSX.IntrinsicElements;
  // @ts-expect-error Expression produces a union type that is too complex to represent.ts(2590)
  return <HtmlTag {...props.attributes}>{props.children}</HtmlTag>;
};
const DefaultElement = (props: RenderElementProps): JSX.Element => {
  return <p {...props.attributes}>{props.children}</p>;
};
