/**
 * This is an example of custom element processing. The logic here is the same as `src/transform/wikiast-util-to-slate-plate-ast/slateBuilder/element/index.ts`, purely for example.
 */
import { ELEMENT_LI, ELEMENT_LIC, TElement } from '@udecode/plate';
import { mergeAdjacent } from '../../../../transform/ast-utils/mergeAdjacent';
import type { IDomParseTreeNode, ITextParseTreeNode } from 'tiddlywiki';
import { IContext } from '../..';
import { convertNodes } from '../../traverse';

export interface IListItemDomParseTreeNode extends IDomParseTreeNode {
  children: Array<IDomParseTreeNode | ITextParseTreeNode>;
  tag: 'li';
}

export function li(context: IContext, node: IDomParseTreeNode): TElement {
  const { children } = node as IListItemDomParseTreeNode;
  const childrenWithLic = children.flatMap((child) => {
    if (child.type === 'text' || (child.tag !== 'ol' && child.tag !== 'ul')) {
      return { type: ELEMENT_LIC, children: convertNodes(context, [child]) };
    }
    return convertNodes(context, [child]);
  })
  return {
    type: ELEMENT_LI,
    // wikiast have li > text, but slate-plate-ast have li > lic > text
    // and merge multiple lic > text created by the flatMap, into a single lic containing multiple text
    children: mergeAdjacent(childrenWithLic, 'lic'),
  };
}
