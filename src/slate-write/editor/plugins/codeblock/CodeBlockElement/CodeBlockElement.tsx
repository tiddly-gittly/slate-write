/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { RefObject, MutableRefObject, useRef, useCallback, ChangeEvent, useMemo, useEffect } from 'react';
import { findNodePath, getPluginOptions, setNodes, Value } from '@udecode/plate-core';
import type { EditorFromTextArea, EditorConfiguration } from 'codemirror';
import useDebouncedCallback from 'beautiful-react-hooks/useDebouncedCallback';
import styled from 'styled-components';
import { getRootProps, StyledElementProps } from '@udecode/plate-styled-components';
import { CodeBlockSelectElement } from './CodeBlockSelectElement';
import { TCodeBlockElement, CodeBlockPlugin } from '../types';
import { ELEMENT_CODE_BLOCK, normalizeLanguage } from '../constants';

const CodeContainer = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`;
const CodeTextArea = styled.textarea`
  width: 100%;
  height: max-content;
`;

export function useCodeMirror(textAreaReference: RefObject<HTMLTextAreaElement>, options: EditorConfiguration): MutableRefObject<EditorFromTextArea | null> {
  const codeMirrorReference: MutableRefObject<EditorFromTextArea | null> = useRef(null);
  const codeMirrorInitialized = useRef(false);
  useEffect(() => {
    if ('CodeMirror' in window && textAreaReference.current !== null && !codeMirrorInitialized.current) {
      const codeMirrorDefaultOptions = {
        lineNumbers: $tw.wiki.getTiddlerText('$:/config/codemirror/lineNumbers') === 'true',
        keyMap: $tw.wiki.getTiddlerText('$:/config/codemirror/keyMap'),
        lineWrapping: $tw.wiki.getTiddlerText('$:/config/codemirror/lineWrapping') === 'true',
        theme: $tw.wiki.getTiddlerText('$:/config/codemirror/theme'),
        autofocus: false,
        readOnly: false,
        cursorBlinkRate: Number($tw.wiki.getTiddlerText('$:/config/codemirror/cursorBlinkRate') ?? '500'),
        indentUnit: Number($tw.wiki.getTiddlerText('$:/config/codemirror/indentUnit') ?? '2'),
        indentWithTabs: $tw.wiki.getTiddlerText('$:/config/codemirror/indentWithTabs') === 'true',
        showCursorWhenSelecting: $tw.wiki.getTiddlerText('$:/config/codemirror/showCursorWhenSelecting') === 'true',
      };
      const codeMirror = window.CodeMirror.fromTextArea(textAreaReference.current, { ...codeMirrorDefaultOptions, ...options });

      codeMirrorReference.current = codeMirror;
      codeMirrorInitialized.current = true;
    }
  }, [textAreaReference, options]);
  return codeMirrorReference;
}

export function useCodeMirrorEventListenerSettled(
  onCodeChange: (eventOrString: ChangeEvent<HTMLTextAreaElement> | string) => void,
  codeMirror: MutableRefObject<EditorFromTextArea | null>,
): void {
  const hasCodeMirrorEventListenerSettled = useRef<boolean>(false);
  useEffect(() => {
    if (codeMirror?.current !== null && !hasCodeMirrorEventListenerSettled.current) {
      codeMirror.current.on('change', (instance) => {
        const latestText = instance.getDoc().getValue();
        onCodeChange(latestText);
      });
      hasCodeMirrorEventListenerSettled.current = true;
    }
  }, [onCodeChange, codeMirror]);
}

export function CodeBlockElement<V extends Value>(props: StyledElementProps<V, TCodeBlockElement>): JSX.Element {
  const { attributes, nodeProps, element, children, editor } = props;

  const rootProps = getRootProps(props);
  const textAreaReference = useRef<HTMLTextAreaElement>(null);

  const { language, code } = element;

  const { showSyntaxSwitcher } = getPluginOptions<CodeBlockPlugin, V>(editor, ELEMENT_CODE_BLOCK);

  const cmOptions = useMemo<EditorConfiguration>(() => ({ mode: language && normalizeLanguage(language), value: code }), [language, code]);
  const codeMirror = useCodeMirror(textAreaReference, cmOptions);
  const path = useMemo(() => findNodePath(editor, element), [editor, element]);
  const onLanguageChange = useCallback(
    (language: string) => {
      if (path !== undefined) {
        setNodes<TCodeBlockElement>(editor, { language }, { at: path });
        codeMirror.current?.setOption('mode', language);
      }
    },
    [editor, path, codeMirror],
  );
  const onCodeChange = useDebouncedCallback(
    (eventOrString: ChangeEvent<HTMLTextAreaElement> | string) => {
      if (path !== undefined) {
        setNodes<TCodeBlockElement>(editor, { code: typeof eventOrString === 'string' ? eventOrString : eventOrString.target.value }, { at: path });
      }
    },
    [editor, path],
  );
  useCodeMirrorEventListenerSettled(onCodeChange, codeMirror);

  return (
    <div {...attributes} {...rootProps} {...nodeProps}>
      {showSyntaxSwitcher === true && <CodeBlockSelectElement data-testid="CodeBlockSelectElement" language={language} onChange={onLanguageChange} />}
      <CodeContainer style={{ userSelect: 'none' }} contentEditable={false} className="tw-codeblock-container">
        <CodeTextArea ref={textAreaReference} onChange={onCodeChange} defaultValue={code} className="CodeMirror" />
      </CodeContainer>
      {children}
    </div>
  );
}
