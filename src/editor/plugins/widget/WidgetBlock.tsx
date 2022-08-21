/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TElement, Value } from '@udecode/plate-core';
import React, { useRef } from 'react';
import { IParseTreeNode } from 'tiddlywiki';
import { useWidget } from 'tw-react';
import { StyledElementProps, getRootProps } from '@udecode/plate-styled-components';
import styled from 'styled-components';
import { WidgetCodeEditor } from './WidgetCodeEditor';
import { useSelected } from 'slate-react';
import is from 'typescript-styled-is';

export interface IWidgetBlockProps {
  element: TElement & { node: IParseTreeNode };
}
export type WidgetBlockElementProps = StyledElementProps<Value, TElement & { node: IParseTreeNode }, IWidgetBlockProps>;

const TwWidgetContainerOuter = styled.div``;
const TwWidgetContainerInner = styled.div`
  user-select: normal;
  white-space: normal;
`;
const TwWidgetCodeContainer = styled.div`
  opacity: 0;
  ${is('selected')`
    opacity: 1;
  `}
  transition: opacity 0.1s;
`;

export function WidgetBlock(props: WidgetBlockElementProps): JSX.Element {
  const { attributes, element, children, editor } = props;
  const widgetContainerReference = useRef<HTMLDivElement>(null);
  useWidget(element.node, widgetContainerReference);
  const rootProps = getRootProps(props);
  const selected = useSelected();
  return (
    <TwWidgetContainerOuter data-role="tw-widget-container" {...attributes} {...rootProps} as={rootProps.as}>
      <TwWidgetContainerInner contentEditable={false}>
        <div ref={widgetContainerReference} />
      </TwWidgetContainerInner>
      {children}
      <TwWidgetCodeContainer selected={selected}>{selected && <WidgetCodeEditor {...props} />}</TwWidgetCodeContainer>
    </TwWidgetContainerOuter>
  );
}
