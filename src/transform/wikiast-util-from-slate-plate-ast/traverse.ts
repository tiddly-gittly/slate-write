import { AnyObject, TNode, isText, isElement } from '@udecode/plate';
import { IParseTreeNode } from 'tiddlywiki';

import { IBuilders } from './wikiAstBuilder';

export type IAnyBuilder = IBuilders & Record<string, typeof convertWikiAstNode>;

export function convertNodes(builders: IBuilders, nodes: Array<TNode<AnyObject>> | undefined): IParseTreeNode[] {
  if (nodes === undefined || nodes.length === 0) {
    return [];
  }

  return nodes.reduce((accumulator: IParseTreeNode[], node) => {
    return [...accumulator, ...convertWikiAstNode(builders as IAnyBuilder, node)];
  }, []);
}

export function convertWikiAstNode(builders: IAnyBuilder, node: TNode<AnyObject>): IParseTreeNode[] {
  // only text and root node don't have a `type` field, deal with it first
  if (isText(node)) {
    return [builders.text(builders, node)];
  }
  if (isElement(node)) {
    const builder = builders[node.type as keyof IBuilders];
    if (typeof builder === 'function') {
      // @ts-expect-error Type 'TElement<AnyObject>' is not assignable to type '{ type: keyof HTMLElementTagNameMap; }'. Types of property 'type' are incompatible. Type 'string' is not assignable to type 'keyof HTMLElementTagNameMap'.ts(2345)
      const builtSlateNodeOrNodes = builder(builders, node);
      return Array.isArray(builtSlateNodeOrNodes) ? builtSlateNodeOrNodes : ([builtSlateNodeOrNodes] as IParseTreeNode[]);
    }
  }
  // it might be a root or pure parent node, reduce it
  if ('children' in node) {
    return convertNodes(builders, node.children);
  }
  return [];
}
