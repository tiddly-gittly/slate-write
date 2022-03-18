import { TElement } from '@udecode/plate';
import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import { IBuilders } from '..';

export function element(builders: IBuilders, node: TElement & { type: keyof HTMLElementTagNameMap }): IDomParseTreeNode {
  const { type: tag, children } = node;
  return {
    type: 'element',
    tag,
    children: convertNodes(builders, children),
  };
}
