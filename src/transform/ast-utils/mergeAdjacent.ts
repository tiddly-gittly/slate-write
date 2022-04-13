import { TNode } from '@udecode/plate';
import { IWikiASTNode } from 'tiddlywiki';

/**
 * Merge all specific node (for example, `lic`) into a single node, currently only merge their children
 * @returns 
 */
export function mergeAdjacent<T extends IWikiASTNode | TNode>(nodes: Array<T>, typeToMerge?: string): Array<T> {
  const result: Array<T> = [];
  let current: T | undefined = undefined;
  for (const node of nodes) {
    if (current && current.type === node.type && (typeToMerge ? node.type === typeToMerge : true)) {
      if (!Array.isArray(current.children)) {
        current.children = [];
      }
      current.children.push(...(node.children ?? []));
    } else {
      result.push(node);
      current = node;
    }
  }
  return result;
}
