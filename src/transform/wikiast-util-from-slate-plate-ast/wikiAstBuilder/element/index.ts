import { TElement } from '@udecode/plate';
import type { IDomParseTreeNode, IWikiASTNode } from 'tiddlywiki';
import pick from 'lodash/pick';

import { convertNodes } from '../../traverse';
import { IBuilders } from '..';

import { blockquote } from './blockquote';
import { a } from './a';

const elementBuilders: Partial<Record<keyof HTMLElementTagNameMap, (builders: IBuilders, node: TElement) => IWikiASTNode>> = {
  blockquote,
  a,
};

export function element(builders: IBuilders, node: TElement & { type: keyof HTMLElementTagNameMap }): IWikiASTNode {
  const { type: tag, children } = node;
  const customElementHandler = elementBuilders[tag];
  if (typeof customElementHandler === 'function') {
    return customElementHandler(builders, node);
  }
  return {
    ...pick(node, ['orderedAttributes', 'attributes', 'isBlock']),
    type: 'element',
    tag,
    children: convertNodes(builders, children),
  } as IDomParseTreeNode;
}
