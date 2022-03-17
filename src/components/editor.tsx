import React from 'react';
import { AnyObject, createPlateUI, createPlugins, Plate, TNode, usePlateEditorRef } from '@udecode/plate';
import { useDebouncedCallback } from 'beautiful-react-hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { deserialize, serialize } from '../../src/transform/serialize';
import { HTMLTags } from 'tiddlywiki';
import { PLUGINS } from 'src/config/plugins';
import { BallonToolbar } from 'src/config/components/Toolbars';
import { GlobalStyle } from 'src/config/globalStyle';
import { withStyledDraggables } from 'src/config/components/withStyledDraggables';
import { withStyledPlaceHolders } from 'src/config/components/withStyledPlaceHolders';

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
    Element: CustomElement;
    Text: CustomText;
  }
}

export interface IEditorAppProps {
  currentTiddler: string;
  initialText: string;
  saver: {
    /** ms about debounce how long between save */
    interval?: number;
    onSave: (value: string) => void;
  };
}
const plugins = createPlugins([...PLUGINS.basicElements, ...PLUGINS.basicMarks, ...PLUGINS.utils], {
  // Plate components
  components: withStyledDraggables(withStyledPlaceHolders(createPlateUI())),
});

export function EditorApp(props: IEditorAppProps): JSX.Element {
  // Add the initial value when setting up our state.
  const initialAst = deserialize(props.initialText);
  const editor = usePlateEditorRef(props.currentTiddler);
  const onSave = useDebouncedCallback(
    (newValue: Array<TNode<AnyObject>>) => {
      // TODO: this seems buggy, sometimes editor.operations is empty array... So I have to add `editor.operations.length === 0 ||`
      const isAstChange = editor?.operations?.length === 0 || editor?.operations?.some?.((op) => op.type !== 'set_selection');
      if (isAstChange) {
        const newText = serialize(newValue);
        props.saver.onSave(newText);
      }
    },
    [props.saver.onSave, editor],
    props.saver.interval,
  );
  if (typeof document === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GlobalStyle />
      <DndProvider backend={HTML5Backend}>
        <Plate
          id={props.currentTiddler}
          initialValue={initialAst}
          plugins={plugins}
          onChange={(newValue) => {
            onSave(newValue);
          }}>
          <BallonToolbar />
        </Plate>
      </DndProvider>
    </>
  );
}
