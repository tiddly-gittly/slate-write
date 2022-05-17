import React, { RefObject, MutableRefObject, useRef, useCallback, ChangeEventHandler, ChangeEvent, useMemo, useEffect } from 'react';
import { findNodePath, getPluginOptions, setNodes, Value } from '@udecode/plate-core';
import type { EditorFromTextArea, EditorConfiguration } from 'codemirror';
import { useDebouncedCallback } from 'beautiful-react-hooks';
import styled from 'styled-components';
import { getRootProps, StyledElementProps } from '@udecode/plate-styled-components';
import { CodeBlockSelectElement } from './CodeBlockSelectElement';
import { TCodeBlockElement, CodeBlockPlugin } from '../types';
import { ELEMENT_CODE_BLOCK } from '../constants';

const CodeTextArea = styled.textarea`
  width: 100%;
  height: max-content;
`;

function useCodeMirror(textAreaReference: RefObject<HTMLTextAreaElement>, options: EditorConfiguration): MutableRefObject<EditorFromTextArea | null> {
  const codeMirrorReference: MutableRefObject<EditorFromTextArea | null> = useRef(null);
  useEffect(() => {
    if ('CodeMirror' in window && textAreaReference.current !== null) {
      const codeMirror = window.CodeMirror.fromTextArea(textAreaReference.current, {
        mode: 'text/plain',
        lineNumbers: true,
        lineWrapping: true,
        theme: 'material',
        autofocus: false,
        readOnly: false,
        ...options,
      });

      codeMirrorReference.current = codeMirror;
    }
  }, [textAreaReference, options]);
  return codeMirrorReference;
}

export function CodeBlockElement<V extends Value>(props: StyledElementProps<V, TCodeBlockElement>): JSX.Element {
  const { attributes, nodeProps, element, editor } = props;

  const rootProps = getRootProps(props);
  const textAreaReference = useRef<HTMLTextAreaElement>(null);

  const { language, code } = element;

  const { showSyntaxSwitcher } = getPluginOptions<CodeBlockPlugin, V>(editor, ELEMENT_CODE_BLOCK);
  const codeClassName = language !== undefined ? `${language} language-${language}` : '';

  const cmOptions = useMemo(() => ({ mode: language, value: code }), [language, code]);
  const codeMirror = useCodeMirror(textAreaReference, cmOptions);
  const path = useMemo(() => findNodePath(editor, element), [editor, element]);
  const onLanguageChange = useCallback(
    (value: string) => {
      if (path !== undefined) {
        setNodes<TCodeBlockElement>(editor, { language: value }, { at: path });
      }
    },
    [editor, path],
  );
  const onCodeChange: ChangeEventHandler<HTMLTextAreaElement> = useDebouncedCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (path !== undefined) {
        setNodes<TCodeBlockElement>(editor, { code: event.target.value }, { at: path });
      }
    },
    [editor, path],
  );

  return (
    <>
      <div data-role="tw-codeblock-container" {...attributes} {...rootProps} {...nodeProps}>
        {showSyntaxSwitcher === true && <CodeBlockSelectElement data-testid="CodeBlockSelectElement" language={language} onChange={onLanguageChange} />}
        <div style={{ userSelect: 'none' }} contentEditable={false}>
          <CodeTextArea ref={textAreaReference} onChange={onCodeChange} defaultValue={code} className={codeClassName} />
        </div>
        {children}
      </div>
    </>
  );
}
