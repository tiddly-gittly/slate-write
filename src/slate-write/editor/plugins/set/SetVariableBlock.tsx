/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TElement, Value } from '@udecode/plate-core';
import { getRootProps, StyledElementProps } from '@udecode/plate-styled-components';
import React, { useRef } from 'react';
import { useSelected } from 'slate-react';
import styled from 'styled-components';
import { IParseTreeNode } from 'tiddlywiki';
import { useWidget } from 'tw-react';

export interface IWidgetBlockProps {
  element: TElement & { node: IParseTreeNode };
}
export type WidgetBlockElementProps = StyledElementProps<Value, TElement & { node: IParseTreeNode }, IWidgetBlockProps>;

const TwSetVariableContainer = styled.div``;

// TODO: add UI to view set's source code, and allow update code like widget using code mirror
export function SetVariableBlock(props: WidgetBlockElementProps): JSX.Element {
  const { attributes, element, children, editor } = props;
  const widgetContainerReference = useRef<HTMLDivElement>(null);
  useWidget(element.node, widgetContainerReference);
  const rootProps = getRootProps(props);
  const selected = useSelected();
  return (
    <TwSetVariableContainer data-role='tw-set-container' {...attributes} {...rootProps} as={rootProps.as}>
      <TwWidgetContainerInner contentEditable={false}>
        <div ref={widgetContainerReference} />
      </TwWidgetContainerInner>
      {children}
      <TwWidgetCodeContainer selected={selected}>{selected && <WidgetCodeEditor {...props} />}</TwWidgetCodeContainer>
    </TwSetVariableContainer>
  );
}
