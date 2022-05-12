import { TText } from '@udecode/plate';
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
