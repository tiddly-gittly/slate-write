import { TElement } from '@udecode/plate';
import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import { IBuilders } from '..';

import { blockquote } from './blockquote';

const elementBuilders: Partial<Record<keyof HTMLElementTagNameMap, (builders: IBuilders, node: TElement) => IDomParseTreeNode>> = {
  blockquote,
};

export function element(builders: IBuilders, node: TElement & { type: keyof HTMLElementTagNameMap }): IDomParseTreeNode {
  const { type: tag, children } = node;
  const customElementHandler = elementBuilders[tag];
  if (typeof customElementHandler === 'function') {
    return customElementHandler(builders, node);
  }
  return {
    type: 'element',
    tag,
    children: convertNodes(builders, children),
  };
}
