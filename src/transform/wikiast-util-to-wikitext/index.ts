import type { IParseTreeNode } from 'tiddlywiki';
import { builders } from './astSerializer';
import { convertNodes } from './traverse';

export function wikiAstToWikiText(input: IParseTreeNode | IParseTreeNode[]): string {
  const lines = convertNodes(builders, Array.isArray(input) ? input : [input]);
  return lines.join('\n');
}
