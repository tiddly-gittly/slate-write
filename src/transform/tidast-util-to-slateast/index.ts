import * as slate from '../slate';
import * as mdast from '../mdast';
import { Decoration, SlateNode, builders } from './slateBuilder';
import { convertNodes } from './traverse';

export function mdastToSlate(node: mdast.Root): slate.Node[] {
  return convertNodes(builders, node.children, {});
}
