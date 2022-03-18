import { AnyObject, TNode } from '@udecode/plate';
import { IParseTreeNode } from 'tiddlywiki';

import { IBuilders } from './slateBuilder';

export type IAnyBuilder = IBuilders & Record<string, typeof slateNode>;

export function convertNodes(builders: IBuilders, nodes: IParseTreeNode[] | undefined): Array<TNode<AnyObject>> {
  if (nodes === undefined || nodes.length === 0) {
    return [{ text: '' }];
  }

  return nodes.reduce((accumulator: Array<TNode<AnyObject>>, node) => {
    return [...accumulator, ...slateNode(builders as IAnyBuilder, node)];
  }, []);
}

export function slateNode(builders: IAnyBuilder, node: IParseTreeNode): Array<TNode<AnyObject>> {
  if (node.type in builders) {
    const builder = builders[node.type];
    if (typeof builder === 'function') {
      const builtSlateNodeOrNodes = builder(builders, node);
      return Array.isArray(builtSlateNodeOrNodes) ? builtSlateNodeOrNodes : ([builtSlateNodeOrNodes] as Array<TNode<AnyObject>>);
    }
  }
  return [];
}
