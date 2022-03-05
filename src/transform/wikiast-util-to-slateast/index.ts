import { IParseTreeNode } from 'tiddlywiki';
import * as slate from '../slate';
import * as mdast from '../mdast';
import { builders } from './slateBuilder';
import { convertNodes } from './traverse';

export function wikiAstToSlateAst(node: mdast.Content[] | IParseTreeNode | IParseTreeNode[]): slate.Node[] {
  return convertNodes(builders, Array.isArray(node) ? node : [node], {});
}
