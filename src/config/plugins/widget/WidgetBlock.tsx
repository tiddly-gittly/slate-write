import { TElement } from '@udecode/plate';
import React from 'react';
import { IParseTreeNode } from 'tiddlywiki';

export interface IWidgetBlockProps {
  element: TElement<{ node: IParseTreeNode }>
}
export function WidgetBlock(props: IWidgetBlockProps): JSX.Element {
  // DEBUG: console
  console.log(`props`, props.element.node);
  return <span>WidgetBlock</span>;
}
