import { AnyObject, TNode } from '@udecode/plate';
import type { IParseTreeNode } from 'tiddlywiki';
import { convertNodes } from './traverse';
import { builders } from './wikiAstBuilder';

export function wikiAstFromSlateAst(input: Array<TNode<AnyObject>>): IParseTreeNode[] {
  return convertNodes(builders, Array.isArray(input) ? input : [input]);
}
