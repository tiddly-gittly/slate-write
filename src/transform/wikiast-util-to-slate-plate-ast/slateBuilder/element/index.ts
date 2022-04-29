import { TNode } from '@udecode/plate';
import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import { IContext } from '../..';
import pick from 'lodash/pick';

import { ul } from './ul';
import { li } from './li';
import { blockquote } from './blockquote';
import { marks } from './marks';
export const elementBuilders = { ul, ol: ul, li, blockquote, ...marks };
export type IElementBuilders = typeof elementBuilders;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function element(context: IContext, node: IDomParseTreeNode): TNode | TNode[] {
  const { tag, children } = node;
  if (typeof elementBuilders[tag as keyof IElementBuilders] === 'function') {
    return elementBuilders[tag as keyof IElementBuilders](context, node);
  }
  return {
    ...pick(node, ['orderedAttributes', 'attributes', 'isBlock']),
    type: tag,
    children: convertNodes(context, children),
  };
}
