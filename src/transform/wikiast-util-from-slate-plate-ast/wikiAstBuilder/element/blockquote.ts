import { TElement } from '@udecode/plate-core';
import type { IDomParseTreeNode, IParseTreeNode, ITextParseTreeNode } from 'tiddlywiki';
import type { IBuilders } from '..';
import { convertNodes } from '../../traverse';

export function blockquote(builders: IBuilders, node: TElement): IDomParseTreeNode {
  const children = convertNodes(builders, node.children).flatMap<IParseTreeNode>((child) => {
    // wrap text node with div node, as required in wikiast
    if (child.type === 'text') {
      return ((child as ITextParseTreeNode).text ?? '').split('\n').map((line) => ({
        type: 'element',
        tag: 'div',
        children: [{ type: 'text' as const, text: line }],
      }));
    }
    return [child];
  });
  return {
    type: 'element',
    tag: 'blockquote',
    children,
  };
}
