/**
 * This is an example of custom element processing. The logic here is the same as `src/transform/wikiast-util-to-slate-plate-ast/slateBuilder/element/index.ts`, purely for example.
 */
import { TElement } from '@udecode/plate-core';
import type { IDomParseTreeNode } from 'tiddlywiki';
import { IContext } from '../..';
import { convertNodes } from '../../traverse';
import { wrapTextWithP } from '../text';

export function tbody(context: IContext, node: IDomParseTreeNode): TElement[] {
  const { children } = node;
  // slate ast don't have tbody node
  return convertNodes(context, children) as TElement[];
}

export function td(context: IContext, node: IDomParseTreeNode): TElement {
  const { tag, children } = node;
  return {
    type: tag,
    children: wrapTextWithP(convertNodes(context, children)) as TElement[],
  };
}
