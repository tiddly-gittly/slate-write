import { TElement } from '@udecode/plate';
import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import { IBuilders } from '..';

// const elementBuilders = {
// };
// export type IElementBuilders = typeof elementBuilders;

export function element(builders: IBuilders, node: TElement & { type: keyof HTMLElementTagNameMap }): IDomParseTreeNode {
  const { type: tag, children } = node;
  // if (typeof elementBuilders[tag as keyof IElementBuilders] === 'function') {
  //   return elementBuilders[tag as keyof IElementBuilders](builders, node);
  // }
  return {
    type: 'element',
    tag,
    children: convertNodes(builders, children),
  };
}
