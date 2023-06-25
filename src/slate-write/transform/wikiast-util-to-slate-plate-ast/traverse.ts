/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { TNode } from '@udecode/plate-core';
import { ICustomParseTreeNode, IParseTreeNode } from 'tiddlywiki';
import type { IContext } from '.';

import { IBuilders } from './slateBuilder';
import { getWikiASTAdditionalProperties } from '../ast-utils/getNodeAdditionalProperties';

export type IAnyBuilder = IBuilders & Record<string, typeof slateNode>;

export function convertNodes(context: IContext, nodes: IParseTreeNode[] | undefined): TNode[] {
  if (nodes === undefined || nodes.length === 0) {
    return [{ text: '' }];
  }

  return nodes.reduce((accumulator: TNode[], node) => {
    return [...accumulator, ...slateNode(context, node)];
  }, []);
}

export function slateNode(context: IContext, node: IParseTreeNode): TNode[] {
  const id = context.idCreator?.();
  const withId = (nodeToAddId: TNode): TNode => (id === undefined ? nodeToAddId : { ...nodeToAddId, id });
  if (node.type in context.builders) {
    const builder = context.builders[node.type as keyof IContext['builders']];
    if (typeof builder === 'function') {
      // basic elements
      const builtSlateNodeOrNodes = builder(context, node as never);
      return Array.isArray(builtSlateNodeOrNodes)
        ? builtSlateNodeOrNodes.map((child) => withId({ ...getWikiASTAdditionalProperties(node), ...child }))
        : ([withId({ ...getWikiASTAdditionalProperties(node), ...builtSlateNodeOrNodes })] as TNode[]);
    }
  } else {
    // widget
    // I guess this rule is enough for judge the current node is a widget? see `test/constants/wikiAst/widget.ts` for example.
    if (typeof node.type === 'string' && 'tag' in node && typeof node.tag === 'string') {
      const widgetNode = withId({ ...getWikiASTAdditionalProperties, ...context.builders.widget(context, node as ICustomParseTreeNode) } as TNode);
      return [widgetNode];
    }
  }
  return [];
}
