/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useRef, ChangeEvent, useMemo, useCallback } from 'react';
import { findNodePath, insertNodes, removeNodes } from '@udecode/plate-core';
import { withoutNormalizing } from '@udecode/plate';
import type { EditorConfiguration } from 'codemirror';
import Tippy from '@tippyjs/react';
import { useDebouncedCallback } from 'beautiful-react-hooks';
// import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { CODE_BLOCK_LANGUAGES, useCodeMirror, useCodeMirrorEventListenerSettled } from '../codeblock';
import { WidgetBlockElementProps } from './WidgetBlock';
import { wikiAstToWikiText } from 'src/transform/wikiast-util-to-wikitext';
import { deserialize } from 'src/transform/serialize';

const CodeBlockWrapper = styled.div<{ left?: number; opacity?: number; top?: number }>`
  position: absolute;
  z-index: 1;
  /** placed on the bottom of widget by default */
  /* top: calc(100% + ${({ top }) => top}px);
  left: ${({ left }) => left}px;
  opacity: ${({ opacity }) => opacity}; */
`;
const CodeBlockContainer = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
`;
const CodeTextArea = styled.textarea`
  width: 100%;
  height: max-content;
`;
const SaveButton = styled.button``;
const SaveButtonText = $tw.wiki.getTiddlerText('$:/language/Buttons/SaveWiki/Hint');

export function WidgetCodeEditor(props: WidgetBlockElementProps): JSX.Element {
  const { element, children, editor } = props;

  const textAreaReference = useRef<HTMLTextAreaElement>(null);

  const code = useMemo(() => wikiAstToWikiText(element.node), [element.node]);
  const cmOptions = useMemo<EditorConfiguration>(() => ({ mode: CODE_BLOCK_LANGUAGES.TiddlyWiki[0], value: code }), [code]);
  const codeMirror = useCodeMirror(textAreaReference, cmOptions);
  const path = useMemo(() => findNodePath(editor, element), [editor, element]);
  const latestCodeReference = useRef<string>(code);
  const onCodeChange = useCallback((eventOrString: ChangeEvent<HTMLTextAreaElement> | string) => {
    const latestCode = typeof eventOrString === 'string' ? eventOrString : eventOrString.target.value;
    latestCodeReference.current = latestCode;
  }, []);
  const onSave = useDebouncedCallback(() => {
    if (path !== undefined) {
      // TODO: use idCreator here, and in every deserialize usages
      const slateNode = deserialize(latestCodeReference.current);
      const previousSelection = editor.selection;
      withoutNormalizing(editor, () => {
        removeNodes(editor, { at: path });
        insertNodes(editor, slateNode, { at: path });
        editor.selection = previousSelection;
      });
      codeMirror.current?.focus?.();
    }
  }, [editor, path, codeMirror]);
  useCodeMirrorEventListenerSettled(onCodeChange, codeMirror);

  // const [topLeft, topLeftSetter] = useState<{ left?: number; top?: number }>({ top: undefined, left: undefined });
  // const [{ opacity }, dragReference] = useDrag(
  //   () => ({
  //     type: 'tw-widget-code-editor-drag-handle',
  //     item() {
  //       $tw.dragInProgress = true;
  //       return { code };
  //     },
  //     collect: (monitor) => ({
  //       opacity: monitor.isDragging() ? 0.5 : 1,
  //     }),
  //     end: (item, monitor) => {
  //       $tw.dragInProgress = false;
  //       const xy = monitor.getClientOffset();
  //       // DEBUG: console
  //       console.log(`xy`, xy);
  //       if (xy !== null) {
  //         topLeftSetter({ top: xy.y, left: xy.x });
  //       }
  //     },
  //   }),
  //   [],
  // );

  return (
    <CodeBlockWrapper /* top={topLeft.top} left={topLeft.left} opacity={opacity} ref={dragReference} */>
      <CodeBlockContainer contentEditable={false}>
        <div className="tw-widget-code-editor-container">
          <CodeTextArea ref={textAreaReference} onChange={onCodeChange} defaultValue={code} className="CodeMirror" />
        </div>
        <Tippy content="(⌃/⌘ + ⏎)">
          <SaveButton onClick={onSave}>{SaveButtonText}</SaveButton>
        </Tippy>
      </CodeBlockContainer>
      {children}
    </CodeBlockWrapper>
  );
}
