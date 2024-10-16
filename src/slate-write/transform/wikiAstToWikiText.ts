import type { IParseTreeNode } from 'tiddlywiki';
import { parents } from 'unist-util-parents';

export interface IWikiAstToWikiTextOptions {
  /** Number of extra `\n` added to the end of file. We will remove extra `\n`, so if you still need them, you have to say you want to add some of them back by this. */
  extraTailingNCount?: number;
}
export function wikiAstToWikiText(input: IParseTreeNode | IParseTreeNode[], options?: IWikiAstToWikiTextOptions): string {
  if (typeof $tw === 'undefined') {
    return '';
  }
  const { extraTailingNCount = 0 } = options ?? {};
  // old code use `cloneDeep` here, but seem to pass test without it, so I remove it.
  // const nodes = Array.isArray(input) ? cloneDeep(input).map((node) => parents(node) as IParseTreeNode) : [parents(cloneDeep(input)) as IParseTreeNode];
  const nodes = Array.isArray(input) ? input.map((node) => parents(node) as IParseTreeNode) : [parents(input) as IParseTreeNode];
  const text = $tw.utils.serializeParseTree(nodes);
  return text.trimEnd() + '\n'.repeat(extraTailingNCount);
}
