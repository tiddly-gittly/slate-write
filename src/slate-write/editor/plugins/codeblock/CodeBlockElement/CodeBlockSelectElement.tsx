/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { getPluginOptions, useEditorRef } from '@udecode/plate-core';
import React from 'react';
import { useReadOnly } from 'slate-react';
import styled, { CSSProp } from 'styled-components';
import { CODE_BLOCK_LANGUAGES, CODE_BLOCK_LANGUAGES_POPULAR, ELEMENT_CODE_BLOCK, normalizeLanguage } from '../constants';
import { CodeBlockPlugin } from '../types';

const CodeSyntaxSelect = styled.select`
  opacity: 20%;
  &:hover {
    opacity: 100%;
  }
  transition: opacity 0.2s;
`;

export function CodeBlockSelectElement({
  language,
  onChange,
  ...props
}: {
  className?: string;
  css?: CSSProp;
  language?: string;
  onChange: Function;
}): JSX.Element | null {
  const [value, setValue] = React.useState(language);
  const editor = useEditorRef();

  if (useReadOnly()) return null;

  const { syntaxPopularFirst } = getPluginOptions<CodeBlockPlugin>(editor, ELEMENT_CODE_BLOCK);

  return (
    <CodeSyntaxSelect
      value={value && normalizeLanguage(value)}
      style={{ float: 'right' }}
      onClick={(event) => {
        event.stopPropagation();
      }}
      onChange={(event) => {
        onChange(event.target.value);
        setValue(event.target.value);
      }}
      contentEditable={false}
      {...props}
    >
      <option value=''>txt</option>
      {syntaxPopularFirst &&
        CODE_BLOCK_LANGUAGES_POPULAR.map((displayName) => {
          const values = CODE_BLOCK_LANGUAGES[displayName];
          const value = Array.isArray(values) ? values[0] : values;
          return (
            <option key={displayName} value={value}>
              {displayName}
            </option>
          );
        })}
      {Object.entries(CODE_BLOCK_LANGUAGES).map(([displayName, values]) => {
        const value = Array.isArray(values) ? values[0] : values;
        return (
          <option key={displayName} value={value}>
            {displayName}
          </option>
        );
      })}
    </CodeSyntaxSelect>
  );
}
