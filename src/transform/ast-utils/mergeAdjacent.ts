/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { TNode } from '@udecode/plate-core';
import { IWikiASTNode } from 'tiddlywiki';

/**
 * Merge all specific node (for example, `lic`) into a single node, currently only merge their children
 * @returns
 */
export function mergeAdjacent<T extends (IWikiASTNode | TNode) & { children: TNode[] }>(nodes: T[], typeToMerge?: string): T[] {
  const result: T[] = [];
  let current: T | undefined;
  for (const node of nodes) {
    if (current !== undefined && current.type === node.type && (typeToMerge ? node.type === typeToMerge : true)) {
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
