import type { TNode } from '@udecode/plate-core';
import type { IParseTreeNode } from 'tiddlywiki';

import { builders, type IBuilders } from './slateBuilder';
import { convertNodes, type slateNode } from './traverse';

export type IAnyBuilder = IBuilders & Record<string, typeof slateNode>;

/**
 * We need a context to know what parent node is wrapping the current node.
 * For example, mark in wikiast is tree structure, but in slate-plate-ast is flat structure, so need context to convert.
 */
export interface IContext {
  builders: IBuilders;
  idCreator?: () => string;
  marks: {
    bold?: boolean;
    code?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    subscript?: boolean;
    superscript?: boolean;
    underline?: boolean;
  };
}
const initialContext: IContext = {
  builders,
  marks: {},
};

export function wikiAstToSlateAst(node: IParseTreeNode | IParseTreeNode[], options?: { idCreator?: () => string }): TNode[] {
  return convertNodes({ ...initialContext, ...options }, Array.isArray(node) ? node : [node]);
}
