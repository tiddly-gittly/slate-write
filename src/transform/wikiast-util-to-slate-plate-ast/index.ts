import { AnyObject, TNode } from '@udecode/plate';
import { IParseTreeNode } from 'tiddlywiki';

import { builders } from './slateBuilder';
import { convertNodes } from './traverse';

export function wikiAstToSlateAst(node: IParseTreeNode | IParseTreeNode[]): Array<TNode<AnyObject>> {
  return convertNodes(builders, Array.isArray(node) ? node : [node]);
}
