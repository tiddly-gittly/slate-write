import { AnyObject, TNode, TEditor, TElement, TText } from '@udecode/plate';
import type { IParseTreeNode } from 'tiddlywiki';
import { convertNodes } from './traverse';
import { builders } from './wikiAstBuilder';

export function wikiAstFromSlateAst(input: Array<TNode<AnyObject>> | TEditor | TElement | TText | Array<TEditor | TElement | TText>): IParseTreeNode[] {
  return convertNodes(builders, Array.isArray(input) ? input : [input]);
}
