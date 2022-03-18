import { IParseTreeNode } from 'tiddlywiki';
import * as slate from '../slate';

import { IBuilders } from './wikiAstBuilder';

export type IAnyBuilder = IBuilders & Record<string, typeof convertWikiAstNode>;

export function convertNodes(builders: IBuilders, nodes: slate.Node[] | undefined): IParseTreeNode[] {
  if (nodes === undefined || nodes.length === 0) {
    return [];
  }

  return nodes.reduce((accumulator: IParseTreeNode[], node) => {
    return [...accumulator, ...convertWikiAstNode(builders as IAnyBuilder, node)];
  }, []);
}

export function convertWikiAstNode(builders: IAnyBuilder, node: slate.Node): IParseTreeNode[] {
  if (!('type' in node)) {
    if ('text' in node) {
      return [builders.text(builders, node)];
    }
    return convertNodes(builders, node.children);
  }
  if (node.type in builders) {
    const builder = builders[node.type];
    if (typeof builder === 'function') {
      const builtSlateNodeOrNodes = builder(builders, node);
      return Array.isArray(builtSlateNodeOrNodes) ? builtSlateNodeOrNodes : ([builtSlateNodeOrNodes] as IParseTreeNode[]);
    }
  }
  return [];
}
