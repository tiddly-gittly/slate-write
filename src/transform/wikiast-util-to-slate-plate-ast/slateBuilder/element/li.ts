/**
 * This is an example of custom element processing. The logic here is the same as `src/transform/wikiast-util-to-slate-plate-ast/slateBuilder/element/index.ts`, purely for example.
 */
import { ELEMENT_LI, ELEMENT_LIC, TElement } from '@udecode/plate';
import type { IDomParseTreeNode, ITextParseTreeNode } from 'tiddlywiki';
import { IBuilders } from '..';
import { convertNodes } from '../../traverse';

export interface IListItemDomParseTreeNode extends IDomParseTreeNode {
  children: Array<IDomParseTreeNode | ITextParseTreeNode>;
  tag: 'li';
}

export function li(builders: IBuilders, node: IDomParseTreeNode): TElement {
  const { children } = node as IListItemDomParseTreeNode;
  return {
    type: ELEMENT_LI,
    // wikiast have li > text, but slate-plate-ast have li > lic > text
    children: children.flatMap((child) => {
      if (child.type === 'text') {
        return { type: ELEMENT_LIC, children: convertNodes(builders, [child]) };
      }
      return convertNodes(builders, [child]);
    }),
  };
}
