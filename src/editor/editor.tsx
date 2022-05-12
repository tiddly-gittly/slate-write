import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { AnyObject, createPlugins, Plate, TNode, getPlateActions, usePlateEditorRef, platesActions, createNodeIdPlugin } from '@udecode/plate';
import { useDebouncedCallback } from 'beautiful-react-hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { deserialize, serialize } from '../transform/serialize';
import * as PLUGINS from 'src/editor/config/plugins';
import { BallonToolbar } from 'src/editor/components/Toolbars';
import { GlobalStyle } from 'src/editor/config/globalStyle';
import { IDefaultWidgetProps, ParentWidgetContext } from 'tw-react';
import { SnippetCombobox } from './components/SnippetCombobox';
import { components } from './components';
import { CONFIG } from './config/config';
import { getIdFactory } from './plugins/id/getId';

export interface IEditorAppProps {
  currentTiddler: string;
  saver: {
    /** ms about debounce how long between save */
    interval?: number;
    /** a lock to prevent update from tiddler to slate, when update of tiddler is trigger by slate. */
    lock: () => void;
    onSave: (value: string) => void;
  };
  tiddlerText: string;
}
const defaultPlugins = createPlugins([...PLUGINS.basicElements, ...PLUGINS.basicMarks, ...PLUGINS.utils, ...PLUGINS.twAdvancedElements], {
  // Plate components
  components,
});

export function Editor(props: IEditorAppProps & IDefaultWidgetProps): JSX.Element {
  const editorID = props.currentTiddler;
  const { resetEditor, value: updateEditorValue } = getPlateActions(editorID);
  const idCreator = useMemo(() => {
    return getIdFactory(props.currentTiddler);
  }, [props.currentTiddler]);
  const editorReference = usePlateEditorRef(editorID);
  // Add the initial value when setting up our state.
  const currentAstReference = useRef<TNode[]>(deserialize(props.tiddlerText, { idCreator }));
  /** current text is only used for compare, we don't want it trigger rerender, so use ref to store it */
  const currentTextReference = useRef<string>(props.tiddlerText);
  // TODO: get dom node to add IME listener to prevent update when IME open https://github.com/udecode/plate/issues/239#issuecomment-1098052241

  // id plugin is vital for drag&drop
  const idPlugin = useMemo(
    () =>
      createNodeIdPlugin({
        options: {
          idCreator,
        },
      }),
    [idCreator],
  );
  const plugins = useMemo(() => createPlugins([...defaultPlugins, idPlugin]), [idPlugin]);

  // update current value from props
  useEffect(() => {
    // there will be cases that triple return replaced with double return (trim),  cause here rerender, but I think it is ok, not so frequent
    if (currentTextReference.current !== props.tiddlerText) {
      const newValue = deserialize(props.tiddlerText, { idCreator });
      currentAstReference.current = newValue;
      // reset selection, so if you delete wikitext, selection won't goto some empty space and cause error
      resetEditor();
      updateEditorValue(newValue);
    }
  }, [props.tiddlerText, currentTextReference, updateEditorValue, resetEditor]);
  useEffect(() => {
    // reset selection, so if you delete wikitext, selection won't goto some empty space and cause error
    resetEditor();
  }, []);
  const onBlur = useCallback(() => {
    // reset selection, so if you delete wikitext, selection won't goto some empty space and cause error
    resetEditor();
  }, []);
  const debouncedSaver = useDebouncedCallback(
    (newValue: TNode[]) => {
      // DEBUG: console
      console.log(`newValue`, newValue);
      const newText = serialize(newValue);
      props.saver.onSave(newText);
      currentTextReference.current = newText;
    },
    [props.saver.onSave],
    props.saver.interval,
  );
  const onChange = useCallback((newValue: TNode[]) => {
    props.saver.lock();
    currentAstReference.current = newValue;
    debouncedSaver(newValue);
  }, []);
  if (typeof document === 'undefined') {
    return <div>Loading...</div>;
  }
  // DEBUG: console
  console.log(`currentAstRef.current`, currentAstReference.current);

  return (
    <Plate id={editorID} initialValue={currentAstReference.current} plugins={plugins} onChange={onChange} editableProps={{ ...CONFIG.editableProps, onBlur }}>
      <BallonToolbar />
      <SnippetCombobox id={editorID} trigger="/" />
    </Plate>
  );
}

export function App(props: IEditorAppProps & IDefaultWidgetProps): JSX.Element {
  return (
    <ParentWidgetContext.Provider value={props.parentWidget}>
      <GlobalStyle />
      <DndProvider backend={HTML5Backend}>
        <Editor {...props} />
      </DndProvider>
    </ParentWidgetContext.Provider>
  );
}
