import { TElement } from '@udecode/plate';
import React, { createRef } from 'react';
import { IParseTreeNode } from 'tiddlywiki';
import { useWidget } from 'tw-react';

export interface IWidgetBlockProps {
  element: TElement<{ node: IParseTreeNode }>;
}
export function WidgetBlock(props: IWidgetBlockProps): JSX.Element {
  const widgetContainerRef = createRef<HTMLDivElement>();
  useWidget(props.element.node, widgetContainerRef);
  return <div ref={widgetContainerRef} />;
}
