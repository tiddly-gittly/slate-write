/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TElement, Value } from '@udecode/plate';
import React, { useRef } from 'react';
import { IParseTreeNode } from 'tiddlywiki';
import { useWidget } from 'tw-react';
import { StyledElementProps, getRootProps } from '@udecode/plate-styled-components';

export interface IWidgetBlockProps {
  element: TElement & { node: IParseTreeNode };
}
export type WidgetBlockElementProps = StyledElementProps<Value, TElement & { node: IParseTreeNode }, IWidgetBlockProps>;

export function WidgetBlock(props: WidgetBlockElementProps): JSX.Element {
  const { attributes, nodeProps, element, children, editor } = props;
  const widgetContainerReference = useRef<HTMLDivElement>(null);
  useWidget(element.node, widgetContainerReference);
  const rootProps = getRootProps(props);
  return (
    <div data-role="tw-widget-container" {...attributes} {...rootProps}>
      <div style={{ userSelect: 'none' }} contentEditable={false} {...nodeProps}>
        <div ref={widgetContainerReference} />
      </div>
      {children}
    </div>
  );
}
