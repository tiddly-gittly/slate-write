import { createPlugins, Plate, PlateProvider } from '@udecode/plate-core';
import { createNodeIdPlugin } from '@udecode/plate-node-id';
import React, { useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IDefaultWidgetProps, ParentWidgetContext } from 'tw-react';

import { components } from './components';
import { MacrosCombobox, SnippetCombobox, WidgetCombobox, WikiLinkCombobox } from './components/combobox';
import { BallonToolbar } from './components/Toolbars';
import { CONFIG } from './config/config';
import { GlobalStyle } from './config/globalStyle';
import * as PLUGINS from './config/plugins';
import { useInitialValueOnChange } from './hooks/useInitialValueOnChange';
import { getIdFactory } from './plugins/id/getId';

export interface IEditorAppProps {
  currentTiddler: string;
  idCreator: () => string;
  /** only changed on initial render, and when text updated by event outside of slate */
  initialTiddlerText: string;
  saver: ISaver;
}
export interface ISaver {
  /** ms about debounce how long between save */
  interval?: number;
  /** a lock to prevent update from tiddler to slate, when update of tiddler is trigger by slate. */
  lock: () => void;
  onSave: (value: string) => void;
}
const defaultPlugins = createPlugins([...PLUGINS.basicElements, ...PLUGINS.basicMarks, ...PLUGINS.utils, ...PLUGINS.twAdvancedElements], {
  // Plate components
  components,
});

export function Editor(props: IEditorAppProps & IDefaultWidgetProps): JSX.Element {
  const { idCreator, currentTiddler: editorID } = props;

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

  return (
    <Plate id={editorID} plugins={plugins} editableProps={{ ...CONFIG.editableProps }}>
      <BallonToolbar />
      <SnippetCombobox id={editorID} pluginKey='/' />
      <WikiLinkCombobox id={editorID} pluginKey='[[' />
      <WikiLinkCombobox id={editorID} pluginKey='{{' />
      <MacrosCombobox id={editorID} pluginKey='<<' />
      <WidgetCombobox id={editorID} pluginKey='<$' />
    </Plate>
  );
}

export function App(props: IEditorAppProps & IDefaultWidgetProps): JSX.Element {
  const editorID = props.currentTiddler;
  const idCreator = useMemo(() => {
    return getIdFactory(props.currentTiddler);
  }, [props.currentTiddler]);
  const [currentAstReference, onChange] = useInitialValueOnChange({
    editorID,
    initialTiddlerText: props.initialTiddlerText,
    saver: props.saver,
    idCreator,
  });
  if (typeof document === 'undefined') {
    return <div>Loading...</div>;
  }
  return (
    <PlateProvider id={editorID} initialValue={currentAstReference.current} onChange={onChange}>
      <ParentWidgetContext.Provider value={props.parentWidget}>
        <GlobalStyle />
        <DndProvider backend={HTML5Backend}>
          <div className='tw-slate-write-container'>
            <Editor {...props} idCreator={idCreator} />
          </div>
        </DndProvider>
      </ParentWidgetContext.Provider>
    </PlateProvider>
  );
}
