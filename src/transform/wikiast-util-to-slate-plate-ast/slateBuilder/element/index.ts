import { TElement } from '@udecode/plate';
import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import { IBuilders } from '..';

import { ul } from './ul';
import { li } from './li';
import { blockquote } from './blockquote';
export const elementBuilders = { ul, ol: ul, li, blockquote };
export type IElementBuilders = typeof elementBuilders;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function element(builders: IBuilders, node: IDomParseTreeNode): TElement {
  const { tag, children } = node;
  if (typeof elementBuilders[tag as keyof IElementBuilders] === 'function') {
    return elementBuilders[tag as keyof IElementBuilders](builders, node);
  }
  return {
    type: tag,
    children: convertNodes(builders, children),
  };
}
