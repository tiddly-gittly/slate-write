import * as mdast from '../mdast';
import * as slate from '../slate';

import { Decoration, IBuilders } from './slateBuilder';

export function convertNodes(builders: IBuilders, nodes: mdast.Content[], deco: Decoration): slate.Node[] {
  if (nodes.length === 0) {
    return [{ text: '' }];
  }

  return nodes.reduce((accumulator: slate.Node[], node) => {
    return [...accumulator, ...slateNode(builders, node, deco)];
  }, []);
}

export function slateNode(builders: IBuilders, node: mdast.Content, deco: Decoration): slate.Node[] {
  const builder = builders[node.type];
  if (typeof builder === 'function') {
    // TODO: why node become never...
    const builtSlateNodeOrNodes = builder(builders, node as never, deco);
    return Array.isArray(builtSlateNodeOrNodes) ? builtSlateNodeOrNodes : ([builtSlateNodeOrNodes] as slate.Node[]);
  }
  return [];
}
