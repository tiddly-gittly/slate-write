import React from 'react';
import { findNodePath, getPluginOptions, setNodes, Value } from '@udecode/plate-core';
import { getRootProps, StyledElementProps } from '@udecode/plate-styled-components';
import { CodeBlockSelectElement } from './CodeBlockSelectElement';
import { TCodeBlockElement, CodeBlockPlugin } from '../types';
import { ELEMENT_CODE_BLOCK } from '../constants';

export function CodeBlockElement<V extends Value>(props: StyledElementProps<V, TCodeBlockElement>): JSX.Element {
  const { attributes, nodeProps, element, editor } = props;

  const rootProps = getRootProps(props);

  const { language, code } = element;

  const { syntax } = getPluginOptions<CodeBlockPlugin, V>(editor, ELEMENT_CODE_BLOCK);
  const codeClassName = language !== undefined ? `${language} language-${language}` : '';

  return (
    <>
      <pre {...attributes} {...rootProps} {...nodeProps}>
        {syntax === true && (
          <CodeBlockSelectElement
            data-testid="CodeBlockSelectElement"
            language={language}
            onChange={(value: string) => {
              const path = findNodePath(editor, element);
              path !== undefined && setNodes<TCodeBlockElement>(editor, { language: value }, { at: path });
            }}
          />
        )}
        <code className={codeClassName}>{code}</code>
      </pre>
    </>
  );
}
