import { TElement, ELEMENT_LIC, TText } from '@udecode/plate';
import type { IParseTreeNode } from 'tiddlywiki';
import type { IBuilders } from '.';
import { convertNodes } from '../traverse';

export function lic(builders: IBuilders, node: TElement<{ children: (TText | TElement)[]; type: typeof ELEMENT_LIC }>): Array<IParseTreeNode> {
  const { children } = node;
  return convertNodes(builders, children);
}
