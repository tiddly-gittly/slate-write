import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { AnyObject, createPlateUI, createPlugins, Plate, TNode, withPlate, PlateEditor } from '@udecode/plate';
import { useDebouncedCallback } from 'beautiful-react-hooks';

import { deserialize, serialize } from '../../src/transform/serialize';
import { HTMLTags } from 'tiddlywiki';
import { PLUGINS } from 'src/config/plugins';

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
  components: createPlateUI(),
});

export function EditorApp(props: IEditorAppProps): JSX.Element {
  // Add the initial value when setting up our state.
  const initialAst = deserialize(props.initialText);
  const editor = useMemo<PlateEditor>(() => withPlate(createEditor(), { id: props.currentTiddler, plugins }), []);
  const onSave = useDebouncedCallback(
    (newValue: Array<TNode<AnyObject>>) => {
      // TODO: this seems buggy, sometimes editor.operations is empty array... So I have to add `editor.operations.length === 0 ||`
      const isAstChange = editor.operations.length === 0 || editor.operations.some((op) => op.type !== 'set_selection');
      if (isAstChange) {
        const newText = serialize(newValue);
        props.saver.onSave(newText);
      }
    },
    [props.saver.onSave],
    props.saver.interval,
  );
  if (typeof document === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <Plate
      initialValue={initialAst}
      editor={editor}
      onChange={(newValue) => {
        onSave(newValue);
      }}>
      {props.initialText}
    </Plate>
  );
}
