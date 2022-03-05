import { IParseTreeNode } from 'tiddlywiki';
import type { IContext } from '.';

export function convertNodes(context: IContext, nodes: IParseTreeNode[] | undefined): string[] {
  if (nodes === undefined || nodes.length === 0) {
    return [];
  }

  return nodes.reduce((accumulator: string[], node) => {
    return [...accumulator, ...convertOneNode(context, node)];
  }, []);
}

export function convertOneNode(context: IContext, node: IParseTreeNode): string[] {
  const { builders } = context;
  if (node.type in builders) {
    const builder = builders[node.type];
    if (typeof builder === 'function') {
      const builtSlateNodeOrNodes = builder(context, node);
      return Array.isArray(builtSlateNodeOrNodes) ? builtSlateNodeOrNodes : [builtSlateNodeOrNodes];
    }
  }
  return [];
}
