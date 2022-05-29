/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useRef, ChangeEvent, useMemo } from 'react';
import { findNodePath, setNodes } from '@udecode/plate-core';
import type { EditorConfiguration } from 'codemirror';
import { useDebouncedCallback } from 'beautiful-react-hooks';
import styled from 'styled-components';
import { getRootProps } from '@udecode/plate-styled-components';
import { CODE_BLOCK_LANGUAGES, useCodeMirror, useCodeMirrorEventListenerSettled } from '../codeblock';
import { WidgetBlockElementProps } from './WidgetBlock';
import { wikiAstToWikiText } from 'src/transform/wikiast-util-to-wikitext';
import { deserialize } from 'src/transform/serialize';

const CodeTextArea = styled.textarea`
  width: 100%;
  height: max-content;
`;

export function WidgetCodeEditor(props: WidgetBlockElementProps): JSX.Element {
  const { attributes, element, children, editor } = props;

  const rootProps = getRootProps(props);
  const textAreaReference = useRef<HTMLTextAreaElement>(null);

  const code = useMemo(() => wikiAstToWikiText(element.node), [element.node]);
  const cmOptions = useMemo<EditorConfiguration>(() => ({ mode: CODE_BLOCK_LANGUAGES.TiddlyWiki[0], value: code }), [code]);
  const codeMirror = useCodeMirror(textAreaReference, cmOptions);
  const path = useMemo(() => findNodePath(editor, element), [editor, element]);
  const onCodeChange = useDebouncedCallback(
    (eventOrString: ChangeEvent<HTMLTextAreaElement> | string) => {
      // DEBUG: console
      console.log(`WidgetCodeEditoreventOrString`, eventOrString);
      if (path !== undefined) {
        const latestCode = typeof eventOrString === 'string' ? eventOrString : eventOrString.target.value;
        // TODO: use idCreator here, and in every deserialize usages
        const slateNode = deserialize(latestCode);
        // DEBUG: console
        console.log(`WidgetCodeEditorslateNode`, slateNode);
        setNodes(editor, slateNode[0], { at: path });
      }
    },
    [editor, path],
  );
  useCodeMirrorEventListenerSettled(onCodeChange, codeMirror);

  return (
    <>
      <div data-role="tw-widget-code-editor-container" {...attributes} {...rootProps}>
        <div style={{ userSelect: 'none' }} contentEditable={false}>
          <CodeTextArea ref={textAreaReference} onChange={onCodeChange} defaultValue={code} className="CodeMirror" />
        </div>
        {children}
      </div>
    </>
  );
}
