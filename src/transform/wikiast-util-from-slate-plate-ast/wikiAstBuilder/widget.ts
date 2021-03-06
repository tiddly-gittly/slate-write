import type { IParseTreeNode } from 'tiddlywiki';
import { TElement } from '@udecode/plate';

import { IBuilders } from '.';

export function widget(builders: IBuilders, node: TElement & { node: IParseTreeNode }): IParseTreeNode {
  return node.node;
}
