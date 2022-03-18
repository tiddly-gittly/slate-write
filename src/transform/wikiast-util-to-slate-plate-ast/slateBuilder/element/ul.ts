/**
 * This is an example of custom element processing. The logic here is the same as `src/transform/wikiast-util-to-slate-plate-ast/slateBuilder/element/index.ts`, purely for example.
 */
import { TElement } from '@udecode/plate';
import type { IDomParseTreeNode } from 'tiddlywiki';
import { IBuilders } from '..';
import { convertNodes } from '../../traverse';

export interface IListItemDomParseTreeNode extends IDomParseTreeNode {
  children: IDomParseTreeNode[];
  tag: 'li';
}
export interface IListDomParseTreeNode extends IDomParseTreeNode {
  tag: 'ol' | 'ul';
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function ul(builders: IBuilders, node: IDomParseTreeNode): TElement {
  const { tag, children } = node as IListDomParseTreeNode;
  return {
    type: tag,
    children: convertNodes(builders, children),
  };
}
