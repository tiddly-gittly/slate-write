import { TNode, TEditor, Value, TElement, TText } from '@udecode/plate';
import type { IParseTreeNode } from 'tiddlywiki';
import { convertNodes } from './traverse';
import { builders } from './wikiAstBuilder';

export function wikiAstFromSlateAst(input: TNode[] | TEditor<Value> | TElement | TText | Array<TEditor<Value> | TElement | TText>): IParseTreeNode[] {
  return convertNodes(builders, Array.isArray(input) ? input : [input]);
}
