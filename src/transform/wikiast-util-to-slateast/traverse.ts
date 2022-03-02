import { IParseTreeNode } from 'tiddlywiki';
import * as mdast from '../mdast';
import * as slate from '../slate';

import { Decoration, IBuilders } from './slateBuilder';

export type IAnyBuilder = IBuilders & Record<string, typeof slateNode>;

export function convertNodes(builders: IBuilders, nodes: Array<mdast.Content | IParseTreeNode> | undefined, deco: Decoration): slate.Node[] {
  if (nodes === undefined || nodes.length === 0) {
    return [{ text: '' }];
  }

  return nodes.reduce((accumulator: slate.Node[], node) => {
    return [...accumulator, ...slateNode(builders as IAnyBuilder, node, deco)];
  }, []);
}

export function slateNode(builders: IAnyBuilder, node: mdast.Content | IParseTreeNode, deco: Decoration): slate.Node[] {
  if (node.type in builders) {
    const builder = builders[node.type];
    if (typeof builder === 'function') {
      // TODO: why node become never...
      const builtSlateNodeOrNodes = builder(builders, node as never, deco);
      return Array.isArray(builtSlateNodeOrNodes) ? builtSlateNodeOrNodes : ([builtSlateNodeOrNodes] as slate.Node[]);
    }
  }
  return [];
}
