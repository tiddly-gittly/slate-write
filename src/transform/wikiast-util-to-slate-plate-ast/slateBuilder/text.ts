import { TText, isText, TNode } from '@udecode/plate-core';
import omit from 'lodash/omit';
import type { ITextParseTreeNode } from 'tiddlywiki';
import { IContext } from '..';

/** Slate node is compact, we need to filter out some keys from wikiast */
const textLevelKeysToOmit = ['type', 'start', 'end'];

export function text(context: IContext, text: ITextParseTreeNode): TText {
  return {
    text: '', // provides default text
    ...omit(text, textLevelKeysToOmit),
    ...context.marks,
  };
}

/**
 * Merge multiple text child with `\n`, make them a single text child
 */
export function mergeSiblingTexts<T extends TNode>(node: T): T {
  return {
    ...node,
    children: (node.children as TNode[]).reduce<TNode[]>((accumulator, child) => {
      const lastChild = accumulator[accumulator.length - 1];
      // if two children are text nodes, merge them
      if (isText(child)) {
        if (isText(lastChild)) {
          return [...accumulator.slice(0, -1), { text: lastChild.text + '\n' + child.text }];
        }
        return [...accumulator, child];
      }
      // if new child is not a text node, recursive
      return [...accumulator, mergeSiblingTexts(child)];
    }, []),
  };
}

/**
 * In table, wikiast has bare text node in td, but slateast requires we have a p wrapper
 */
export function wrapTextWithP(nodes: TNode[]): TNode[] {
  return nodes.map((node) => {
    if (typeof node.text === 'string' && node.type === undefined) {
      return {
        type: 'p',
        children: [node],
      } as TNode;
    }
    return node;
  });
}
