/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getRootProps, PlateElementProps } from '@udecode/plate-utils';
import { TElement, Value } from '@udecode/slate';
import React, { useRef } from 'react';
import { useSelected } from 'slate-react';
import styled from 'styled-components';
import { IParseTreeNode } from 'tiddlywiki';
import { useWidget } from 'tw-react';
import is from 'typescript-styled-is';
import { WidgetCodeEditor } from './WidgetCodeEditor';

export interface IWidgetBlockProps {
  element: TElement & { node: IParseTreeNode };
}
export type WidgetBlockElementProps = PlateElementProps<Value, TElement & { node: IParseTreeNode }, IWidgetBlockProps>;

export const TwWidgetContainerOuter = styled.div``;
export const TwWidgetContainerInner = styled.div`
  user-select: normal;
  white-space: normal;
`;
export const TwWidgetCodeContainer = styled.div<{ $selected?: boolean }>`
  opacity: 0;
  ${is('$selected')`
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
    <TwWidgetContainerOuter data-role='tw-widget-container' {...attributes} {...rootProps} as={rootProps.as as undefined}>
      <TwWidgetContainerInner contentEditable={false}>
        <div ref={widgetContainerReference} />
      </TwWidgetContainerInner>
      {children}
      <TwWidgetCodeContainer $selected={selected}>{selected && <WidgetCodeEditor {...props} />}</TwWidgetCodeContainer>
    </TwWidgetContainerOuter>
  );
}
