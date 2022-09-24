import { TElement } from '@udecode/plate-core';
import type { IDomParseTreeNode, IWikiASTNode } from 'tiddlywiki';

import { convertNodes } from '../../traverse';
import { IBuilders } from '..';

import { blockquote } from './blockquote';
import { a } from './a';
import { table, td } from './table';

const elementBuilders: Partial<Record<keyof HTMLElementTagNameMap, (builders: IBuilders, node: TElement) => IWikiASTNode>> = {
  blockquote,
  a,
  table,
  td,
};

export function element(builders: IBuilders, node: TElement & { type: keyof HTMLElementTagNameMap }): IWikiASTNode {
  const { type: tag, children } = node;
  const customElementHandler = elementBuilders[tag];
  if (typeof customElementHandler === 'function') {
    return customElementHandler(builders, node);
  }
  return {
    type: 'element',
    tag,
    children: convertNodes(builders, children),
  } as IDomParseTreeNode;
}
