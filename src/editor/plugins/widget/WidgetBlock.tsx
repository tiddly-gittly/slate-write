/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TElement, Value } from '@udecode/plate';
import React, { createRef } from 'react';
import { IParseTreeNode } from 'tiddlywiki';
import { useWidget } from 'tw-react';
import { StyledElementProps, getRootProps } from '@udecode/plate-styled-components';

export interface IWidgetBlockProps {
  element: TElement & { node: IParseTreeNode };
}
export type WidgetBlockElementProps = StyledElementProps<Value, TElement & { node: IParseTreeNode }, IWidgetBlockProps>;

export function WidgetBlock(props: WidgetBlockElementProps): JSX.Element {
  const { attributes, children, nodeProps, element, editor } = props;
  const widgetContainerReference = createRef<HTMLDivElement>();
  useWidget(element.node, widgetContainerReference);
  const rootProps = getRootProps(props);
  return (
    <div {...attributes} {...rootProps}>
      {children}
      <div style={{ userSelect: 'none' }} contentEditable={false} {...nodeProps} ref={widgetContainerReference} />
    </div>
  );
}
