import { Plate, PlateProvider } from '@udecode/plate-core';
import React, { useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IDefaultWidgetProps, ParentWidgetContext } from 'tw-react';

import { MacrosCombobox, SnippetCombobox, WidgetCombobox, WikiLinkCombobox } from './components/combobox';
import { BallonToolbar } from './components/Toolbars';
import { CONFIG } from './config/config';
import { GlobalStyle } from './config/globalStyle';
import { useInitialValueOnChange } from './hooks/useInitialValueOnChange';
import { usePlugins } from './hooks/usePlugins';
import { getIdFactory } from './plugins/id/getId';

export interface IEditorAppProps {
  currentTiddler: string;
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

export function Editor(props: IEditorAppProps & IDefaultWidgetProps): JSX.Element {
  const { currentTiddler: editorID } = props;

  // TODO: get dom node to add IME listener to prevent update when IME open https://github.com/udecode/plate/issues/239#issuecomment-1098052241

  return (
    <Plate id={editorID} editableProps={{ ...CONFIG.editableProps }}>
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
    return getIdFactory(editorID);
  }, [editorID]);
  const [currentAstReference, onChange] = useInitialValueOnChange({
    editorID,
    initialTiddlerText: props.initialTiddlerText,
    saver: props.saver,
    idCreator,
  });
  const plugins = usePlugins({ idCreator });

  if (typeof document === 'undefined') {
    return <div>Loading...</div>;
  }
  return (
    <PlateProvider id={editorID} initialValue={currentAstReference.current} onChange={onChange} plugins={plugins}>
      <ParentWidgetContext.Provider value={props.parentWidget}>
        <GlobalStyle />
        <DndProvider backend={HTML5Backend}>
          <div className='tw-slate-write-container'>
            <Editor {...props} />
          </div>
        </DndProvider>
      </ParentWidgetContext.Provider>
    </PlateProvider>
  );
}
