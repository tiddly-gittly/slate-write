/**
 * This is an example of custom element processing. The logic here is the same as `src/transform/wikiast-util-to-slate-plate-ast/slateBuilder/element/index.ts`, purely for example.
 */
import { TElement } from '@udecode/plate';
import type { IDomParseTreeNode } from 'tiddlywiki';
import { IContext } from '../..';
import { convertNodes } from '../../traverse';
import { mergeSiblingTexts } from '../text';

export function blockquote(context: IContext, node: IDomParseTreeNode): TElement {
  // unwrap div generated by wiki parser
  const children = convertNodes(context, node.children).flatMap((child) => {
    if (child.type === 'div') {
      return child.children as TElement[];
    }
    return [child];
  });
  const result = {
    type: node.tag,
    children,
  };
  return mergeSiblingTexts(result);
}
