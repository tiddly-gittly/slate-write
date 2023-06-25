import { ICustomParseTreeNode, IParseTreeNode } from 'tiddlywiki';
import type { IContext } from '.';

export function convertNodes(context: IContext, nodes: IParseTreeNode[] | undefined): string[] {
  const isRoot = context.root;
  context.root = false;
  /** each layer need is own index, because it is a tree */
  const previousStackIndex = context.index;
  context.index = 0;

  if (nodes === undefined || nodes.length === 0) {
    return [];
  }

  const result = nodes.reduce((accumulator: string[], node) => {
    const result = [...accumulator, ...convertOneNode(context, node)];
    context.index += 1;
    return isRoot ? [...result, '\n'] : result;
  }, []);
  context.index = previousStackIndex;
  return result;
}

export function convertOneNode(context: IContext, node: IParseTreeNode): string[] {
  const { builders } = context;
  let result: string[] = [];
  if (node.type in builders) {
    const builder = builders[node.type];
    if (typeof builder === 'function') {
      const builtSlateNodeOrNodes = builder(context, node);
      result = Array.isArray(builtSlateNodeOrNodes) ? builtSlateNodeOrNodes : [builtSlateNodeOrNodes];
    }
  } else {
    // widget
    // I guess this rule is enough for judge the current node is a widget?
    if (typeof node.type === 'string' && 'tag' in node && typeof node.tag === 'string') {
      result = builders.widget(context, node as ICustomParseTreeNode);
    }
  }
  return node.isBlock === true ? [...result, '\n'] : result;
}
