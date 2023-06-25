import type { IParseTreeNode } from 'tiddlywiki';
import { TElement } from '@udecode/plate-core';
import { convertNodes } from '../traverse';

import { IBuilders } from '.';

export function set(builders: IBuilders, node: TElement & { node: IParseTreeNode }): IParseTreeNode {
  const children = convertNodes(builders, node.children);
  return { ...node.node, children };
}
