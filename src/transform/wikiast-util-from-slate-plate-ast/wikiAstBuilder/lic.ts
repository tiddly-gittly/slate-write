import { TElement, ELEMENT_LIC, TText } from '@udecode/plate';
import type { ITextParseTreeNode, IDomParseTreeNode } from 'tiddlywiki';
import type { IBuilders } from '.';

export function lic(builders: IBuilders, node: TElement<{ children: TText[]; type: typeof ELEMENT_LIC }>): Array<ITextParseTreeNode | IDomParseTreeNode> {
  const { children } = node;
  const texts = children.map((child: TText) => builders.text(builders, child));
  return texts;
}
