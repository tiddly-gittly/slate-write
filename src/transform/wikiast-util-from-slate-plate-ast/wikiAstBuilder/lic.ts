import { TElement, ELEMENT_LIC, TText } from '@udecode/plate';
import type { ITextParseTreeNode } from 'tiddlywiki';
import type { IBuilders } from '.';

export function lic(builders: IBuilders, node: TElement<{ children: TText[]; type: typeof ELEMENT_LIC }>): ITextParseTreeNode {
  const { children } = node;
  const texts = children.map((child: TText) => builders.text(builders, child));
  return {
    type: 'text',
    text: texts.map((text) => text.text).join('\n'),
  };
}
