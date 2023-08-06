import { Plate, PlateProvider } from '@udecode/plate-core';
import { MutableRefObject, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IDefaultWidgetProps, ParentWidgetContext } from 'tw-react';

import { MacrosCombobox, SnippetCombobox, WidgetCombobox, WikiLinkCombobox } from './components/combobox';
import { CONFIG } from './config/config';
import { GlobalStyle } from './config/globalStyle';
import { useInitialValue, useOnChange } from './hooks/useInitialValueOnChange';
import { usePlugins } from './hooks/usePlugins';
import { getIdFactory } from './plugins/id/getId';
import './style.css';
import { TElement } from '@udecode/slate';
import { FloatingToolbar } from './components/plate-ui/floating-toolbar';
import { TooltipProvider } from './components/plate-ui/tooltip';
import { FloatingToolbarButtons } from './components/Toolbars';

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

export function Editor(props: IEditorAppProps & IDefaultWidgetProps & { currentAstReference: MutableRefObject<TElement[]>; idCreator: () => string }): JSX.Element {
  const { currentTiddler: editorID, parentWidget, currentAstReference, initialTiddlerText, saver, idCreator } = props;
  useOnChange({
    editorID,
    initialTiddlerText,
    saver,
    idCreator,
    currentAstReference,
  });
  // TODO: get dom node to add IME listener to prevent update when IME open https://github.com/udecode/plate/issues/239#issuecomment-1098052241
  return (
    <Plate id={editorID} editableProps={{ ...CONFIG.editableProps }} onChange={console.log}>
      <FloatingToolbar portalElement={parentWidget?.parentDomNode} floatingOptions={{ placement: 'top-end' }}>
        <FloatingToolbarButtons />
      </FloatingToolbar>
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
  const currentAstReference = useInitialValue({
    editorID,
    initialTiddlerText: props.initialTiddlerText,
    saver: props.saver,
    idCreator,
  });
  const plugins = usePlugins({ idCreator });

  // prevent working in headless/test mode which might throw error
  if (typeof document === 'undefined') {
    return <div>Loading...</div>;
  }
  return (
    <ParentWidgetContext.Provider value={props.parentWidget}>
      <GlobalStyle />
      <DndProvider backend={HTML5Backend}>
        <TooltipProvider
          disableHoverableContent
          delayDuration={500}
          skipDelayDuration={0}
        >
          <div className='tw-slate-write-container'>
            <PlateProvider id={editorID} initialValue={currentAstReference.current} plugins={plugins}>
              <Editor {...props} currentAstReference={currentAstReference} idCreator={idCreator} />
            </PlateProvider>
          </div>
        </TooltipProvider>
      </DndProvider>
    </ParentWidgetContext.Provider>
  );
}
