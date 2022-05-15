/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TElement, Value } from '@udecode/plate';
import React, { createRef } from 'react';
import { IParseTreeNode } from 'tiddlywiki';
import { useMacro } from 'tw-react';
import { StyledElementProps, getRootProps } from '@udecode/plate-styled-components';

export interface IMacroBlockProps {
  element: TElement & { node: IParseTreeNode };
}
export type MacroBlockElementProps = StyledElementProps<Value, TElement & { node: IParseTreeNode }, IMacroBlockProps>;

export function MacroBlock(props: MacroBlockElementProps): JSX.Element {
  const { attributes, children, nodeProps, element, editor } = props;
  const macroContainerReference = createRef<HTMLDivElement>();
  useMacro(element.node, macroContainerReference);
  const rootProps = getRootProps(props);
  return (
    <div data-role="tw-macro-container" {...attributes} {...rootProps}>
      <div style={{ userSelect: 'none' }} contentEditable={false} {...nodeProps}>
        <div ref={macroContainerReference} />
      </div>
    </div>
  );
}
