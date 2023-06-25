import { TText, TNode } from '@udecode/plate-core';
import type { ITextParseTreeNode, IDomParseTreeNode } from 'tiddlywiki';
import { IBuilders } from '.';

export type TTextWithMark = TText & {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  subscript?: boolean;
  superscript?: boolean;
  underline?: boolean;
};

function textWithoutMark(builders: IBuilders, node: TTextWithMark): ITextParseTreeNode | IDomParseTreeNode {
  return {
    type: 'text',
    text: node.text,
  };
}

/**
 * In table, wikiast has bare text node in td, but slateast requires we have a p wrapper. Now we remove the wrapper and restore the bare text.
 */
export function unwrapSlateTextWithP(nodes: TNode[]): TNode[] {
  return nodes.flatMap((node) => {
    if (node.type === 'p' && Array.isArray(node.children) && node.children.every((node) => 'text' in node)) {
      return node.children as TNode[];
    }
    return node;
  });
}

const markTypeMap = {
  bold: 'strong',
  italic: 'em',
  underline: 'u',
  strikethrough: 'strike',
  code: 'code',
  superscript: 'sup',
  subscript: 'sub',
} as const;
export function text(builders: IBuilders, node: TTextWithMark): ITextParseTreeNode | IDomParseTreeNode {
  // position in the list is the priority of the mark, code can't have mark, so it should be the last one to add (be the leaf node)
  for (const markType of ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code'] as const) {
    if (node[markType] === true) {
      return {
        type: 'element',
        tag: markTypeMap[markType],
        children: [text(builders, { ...node, [markType]: undefined })],
      };
    }
  }
  return textWithoutMark(builders, node);
}
