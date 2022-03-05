import { IParseTreeNode } from 'tiddlywiki';

import { IBuilders } from './astSerializer';

export type IAnyBuilder = IBuilders & Record<string, typeof convertOneNode>;

export function convertNodes(builders: IBuilders, nodes: IParseTreeNode[] | undefined): string[] {
  if (nodes === undefined || nodes.length === 0) {
    return [];
  }

  return nodes.reduce((accumulator: string[], node) => {
    return [...accumulator, ...convertOneNode(builders as IAnyBuilder, node)];
  }, []);
}

export function convertOneNode(builders: IAnyBuilder, node: IParseTreeNode): string[] {
  if (node.type in builders) {
    const builder = builders[node.type];
    if (typeof builder === 'function') {
      const builtSlateNodeOrNodes = builder(builders, node);
      return Array.isArray(builtSlateNodeOrNodes) ? builtSlateNodeOrNodes : [builtSlateNodeOrNodes];
    }
  }
  return [];
}
