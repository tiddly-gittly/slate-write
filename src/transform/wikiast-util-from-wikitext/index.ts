import type { IParseTreeNode } from 'tiddlywiki';

export function fromWikiText(input: string): IParseTreeNode[] {
  if (typeof $tw === 'undefined') {
    return [];
  }
  const parser = $tw?.wiki?.parseText?.bind?.($tw, 'text/vnd.tiddlywiki') ?? (() => ({ tree: [] }));
  const rootNode = parser(input).tree;
  return rootNode;
}
