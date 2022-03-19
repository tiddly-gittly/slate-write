import { TElement } from '@udecode/plate';
import type { IDomParseTreeNode, IParseTreeNode } from 'tiddlywiki';
import type { IBuilders } from '..';
import { convertNodes } from '../../traverse';

export function blockquote(builders: IBuilders, node: TElement): IDomParseTreeNode {
  const children: IParseTreeNode[] = convertNodes(builders, node.children).flatMap((child) => {
    // wrap text node with div node, as required in wikiast
    if (child.type === 'text') {
      return (child.text ?? '').split('\n').map((line) => ({
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
