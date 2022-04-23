import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnyObject, createPlateUI, createPlugins, ImageToolbarButton, LinkToolbarButton, Plate, TNode, getPlateActions } from '@udecode/plate';
import { useDebouncedCallback } from 'beautiful-react-hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HeadingToolbar } from '@udecode/plate-ui-toolbar';
import { Image } from '@styled-icons/material/Image';

import { deserialize, serialize } from '../../src/transform/serialize';
import { HTMLTags } from 'tiddlywiki';
import { PLUGINS } from 'src/config/plugins';
import {
  AlignToolbarButtons,
  BallonToolbar,
  BasicElementToolbarButtons,
  BasicMarkToolbarButtons,
  ListToolbarButtons,
  TableToolbarButtons,
} from 'src/config/components/Toolbars';
import { GlobalStyle } from 'src/config/globalStyle';
import { withStyledDraggables } from 'src/config/components/withStyledDraggables';
import { withStyledPlaceHolders } from 'src/config/components/withStyledPlaceHolders';
import { Link } from '@styled-icons/boxicons-regular';

export interface IEditorAppProps {
  currentTiddler: string;
  tiddlerText: string;
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
  const editorID = props.currentTiddler;
  const { resetEditor, value: updateEditorValue } = getPlateActions(editorID);
  // Add the initial value when setting up our state.
  const [currentAst, setCurrentAst] = useState<Array<TNode<AnyObject>>>(deserialize(props.tiddlerText));
  /** current text is only used for compare, we don't want it trigger rerender, so use ref to store it */
  const currentTextRef = useRef<string>(props.tiddlerText);
  // update current value from props
  useEffect(() => {
    // there will be cases that triple return replaced with double return (trim),  cause here rerender, but I think it is ok, not so frequent
    if (currentTextRef.current !== props.tiddlerText) {
      const newValue = deserialize(props.tiddlerText);
      setCurrentAst(newValue);
      updateEditorValue(newValue);
      resetEditor();
    }
  }, [props.tiddlerText, currentTextRef, updateEditorValue, resetEditor]);
  const onChange = useDebouncedCallback(
    (newValue: Array<TNode<AnyObject>>) => {
      setCurrentAst(newValue);
      const newText = serialize(newValue);
      props.saver.onSave(newText);
      currentTextRef.current = newText;
    },
    [props.saver.onSave],
    props.saver.interval,
  );
  if (typeof document === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GlobalStyle />
      <DndProvider backend={HTML5Backend}>
        <Plate id={editorID} initialValue={currentAst} plugins={plugins} onChange={onChange}>
          <HeadingToolbar>
            <BasicElementToolbarButtons />
            <ListToolbarButtons />
            <BasicMarkToolbarButtons />
            <AlignToolbarButtons />
            <LinkToolbarButton icon={<Link />} />
            <ImageToolbarButton icon={<Image />} />
            <TableToolbarButtons />
          </HeadingToolbar>

          <BallonToolbar />
        </Plate>
      </DndProvider>
    </>
  );
}
