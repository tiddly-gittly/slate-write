import type { IDomParseTreeNode } from 'tiddlywiki';
import { IBuilders } from '..';
import { convertNodes } from '../../traverse';

export interface IListItemDomParseTreeNode extends IDomParseTreeNode {
  children: IDomParseTreeNode[];
  tag: 'li';
}
export interface IListDomParseTreeNode extends IDomParseTreeNode {
  tag: 'ol' | 'ul';
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function ul(builders: IBuilders, node: IDomParseTreeNode) {
  const { type, tag, children } = node;
  // make ol > (li > text) + ol > (li > text) + ol > li > text
  // to ol > li > (text + ol > li > (text + ol > li > text))
  // in tiddlywiki, indented list is at the same level of text
  // const listInGrandChildren = []
  return {
    type,
    tag,
    children: convertNodes(builders, children),
  };
}

// function flattenList(list: IListDomParseTreeNode) {}
