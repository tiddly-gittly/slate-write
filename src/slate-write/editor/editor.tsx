import { IDefaultWidgetProps, ParentWidgetContext } from '$:/plugins/linonetwo/tw-react/index.js';
import { Plate } from '@udecode/plate-common/react';
import { useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { GlobalStyle } from './config/globalStyle';
import { useInitialValue, useOnChange } from './hooks/useInitialValueOnChange';
import { getIdFactory } from './plugins/id/getId';
import './style.css';
import { Editor } from './components/plate-ui/editor';
import { TooltipProvider } from './components/plate-ui/tooltip';
import { useSlateWriteEditor } from './useEditor';

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

// export function Editor(props: IEditorAppProps & IDefaultWidgetProps & { currentAstReference: MutableRefObject<TElement[]>; idCreator: () => string }): JSX.Element {
//   const { currentTiddler: editorID, currentAstReference, initialTiddlerText, saver, idCreator } = props;

//   // TODO: get dom node to add IME listener to prevent update when IME open https://github.com/udecode/plate/issues/239#issuecomment-1098052241
//   return (
//     <Plate id={editorID} editableProps={{ ...CONFIG.editableProps }} onChange={console.log}>
//       <FloatingToolbar floatingOptions={{ placement: 'top-end' }}>
//         <FloatingToolbarButtons />
//       </FloatingToolbar>
//       <SnippetCombobox id={editorID} pluginKey='/' />
//       <WikiLinkCombobox id={editorID} pluginKey='[[' />
//       <WikiLinkCombobox id={editorID} pluginKey='{{' />
//       <MacrosCombobox id={editorID} pluginKey='<<' />
//       <WidgetCombobox id={editorID} pluginKey='<$' />
//     </Plate>
//   );
// }

export function App({ initialTiddlerText, saver, currentTiddler: editorID, parentWidget }: IEditorAppProps & IDefaultWidgetProps): JSX.Element {
  const scrollSelector = '.tw-slate-write-container';
  const idCreator = useMemo(() => {
    return getIdFactory(editorID);
  }, [editorID]);
  const currentAstReference = useInitialValue({
    initialTiddlerText,
    saver,
    idCreator,
  });
  const editor = useSlateWriteEditor(editorID, idCreator, currentAstReference, scrollSelector);

  const onChange = useOnChange({
    editor,
    initialTiddlerText,
    saver,
    idCreator,
    currentAstReference,
  });

  // prevent working in headless/test mode which might throw error
  if (typeof document === 'undefined') {
    return <div>Loading...</div>;
  }
  return (
    <ParentWidgetContext.Provider value={parentWidget}>
      <GlobalStyle />
      <DndProvider backend={HTML5Backend}>
        <TooltipProvider
          disableHoverableContent
          delayDuration={500}
          skipDelayDuration={0}
        >
          <div className='tw-slate-write-container'>
            <Plate editor={editor} onChange={onChange}>
              <Editor />
            </Plate>
          </div>
        </TooltipProvider>
      </DndProvider>
    </ParentWidgetContext.Provider>
  );
}
