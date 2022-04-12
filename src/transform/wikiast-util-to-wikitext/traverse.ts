import { IParseTreeNode } from 'tiddlywiki';
import type { IContext } from '.';

export function convertNodes(context: IContext, nodes: IParseTreeNode[] | undefined): string[] {
  const isRoot = context.root;
  context.root = false;

  if (nodes === undefined || nodes.length === 0) {
    return [];
  }

  return nodes.reduce((accumulator: string[], node) => {
    const result = [...accumulator, ...convertOneNode(context, node)];
    return isRoot ? [...result, '\n'] : result;
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
