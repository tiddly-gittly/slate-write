import type { IParseTreeNode } from 'tiddlywiki';
import * as slate from '../slate';
import { convertNodes } from './traverse';
import { builders } from './wikiAstBuilder';

export function wikiAstFromSlateAst(input: slate.Node | slate.Node[]): IParseTreeNode[] {
  return convertNodes(builders, Array.isArray(input) ? input : [input]);
}
