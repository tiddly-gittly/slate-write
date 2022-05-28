import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { createPlugins, Plate, TNode, getPlateActions, usePlateEditorRef, createNodeIdPlugin, TElement, PlateProvider } from '@udecode/plate';
import { useDebouncedCallback } from 'beautiful-react-hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { deserialize, serialize } from '../transform/serialize';
import * as PLUGINS from 'src/editor/config/plugins';
import { BallonToolbar } from 'src/editor/components/Toolbars';
import { GlobalStyle } from 'src/editor/config/globalStyle';
import { IDefaultWidgetProps, ParentWidgetContext } from 'tw-react';
import { MacrosCombobox, SnippetCombobox, WikiLinkCombobox, WidgetCombobox } from './components/combobox';
import { components } from './components';
import { CONFIG } from './config/config';
import { getIdFactory } from './plugins/id/getId';
import { ReactEditor } from 'slate-react';

export interface IEditorAppProps {
  currentTiddler: string;
  /** only changed on initial render, and when text updated by event outside of slate */
  initialTiddlerText: string;
  saver: {
    /** ms about debounce how long between save */
    interval?: number;
    /** a lock to prevent update from tiddler to slate, when update of tiddler is trigger by slate. */
    lock: () => void;
    onSave: (value: string) => void;
  };
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
  const currentAstReference = useRef<TElement[]>(deserialize(props.initialTiddlerText, { idCreator }));
  /** current text is only used for compare, we don't want it trigger rerender, so use ref to store it */
  const currentTextReference = useRef<string>(props.initialTiddlerText);
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
    if (currentTextReference.current !== props.initialTiddlerText) {
      const newValue = deserialize(props.initialTiddlerText, { idCreator });
      currentAstReference.current = newValue;
      // reset selection, so if you delete wikitext, selection won't goto some empty space and cause error
      resetEditor();
      updateEditorValue(newValue);
    }
  }, [props.initialTiddlerText, currentTextReference, updateEditorValue, resetEditor, idCreator]);
  const saver = useCallback(
    (newValue: TNode[]) => {
      // DEBUG: console
      console.log(`newValue`, newValue);
      const newText = serialize(newValue);
      props.saver.onSave(newText);
      currentTextReference.current = newText;
    },
    [props.saver.onSave],
  );
  const debouncedSaver = useDebouncedCallback(saver, [saver], props.saver.interval);
  const onChange = useCallback(
    (newValue: TElement[]) => {
      if (currentAstReference.current === newValue) return;
      // DEBUG: console
      console.log(`currentAstReference.current = newValue`, newValue);
      currentAstReference.current = newValue;
      // check isComposing and if user is just set_selection
      if (editorReference === null || ReactEditor.isComposing(editorReference as ReactEditor)) {
        return;
      }
      if (editorReference.operations.every((op) => op.type === 'set_selection')) {
        return;
      }
      props.saver.lock();
      debouncedSaver(newValue);
    },
    [debouncedSaver, editorReference, props.saver],
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
  const onBlur = useCallback(() => {
    // reset selection, so if you delete wikitext, selection won't goto some empty space and cause error
    resetEditor();
    // resetEditor is different every time, and allow it causing rerender will make dnd not draggable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (typeof document === 'undefined') {
    return <div>Loading...</div>;
  }
  // DEBUG: console
  console.log(`currentAstRef.current`, currentAstReference.current);

  return (
    <Plate id={editorID} initialValue={currentAstReference.current} plugins={plugins} onChange={onChange} editableProps={{ ...CONFIG.editableProps, onBlur }}>
      <BallonToolbar />
      <SnippetCombobox id={editorID} pluginKey="/" />
      <WikiLinkCombobox id={editorID} pluginKey="[[" />
      <WikiLinkCombobox id={editorID} pluginKey="{{" />
      <MacrosCombobox id={editorID} pluginKey="<<" />
      <WidgetCombobox id={editorID} pluginKey="<$" />
    </Plate>
  );
}

export function App(props: IEditorAppProps & IDefaultWidgetProps): JSX.Element {
  return (
    <PlateProvider id={props.currentTiddler}>
      <ParentWidgetContext.Provider value={props.parentWidget}>
        <GlobalStyle />
        <DndProvider backend={HTML5Backend}>
          <Editor {...props} />
        </DndProvider>
      </ParentWidgetContext.Provider>
    </PlateProvider>
  );
}
