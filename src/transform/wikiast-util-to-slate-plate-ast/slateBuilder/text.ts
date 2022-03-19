import { TText, TElement, isText, TNode } from '@udecode/plate';
import omit from 'lodash/omit';
import type { ITextParseTreeNode } from 'tiddlywiki';
import { IBuilders } from '.';

/** Slate node is compact, we need to filter out some keys from wikiast */
const textLevelKeysToOmit = ['type', 'start', 'end'];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function text(builders: IBuilders, text: ITextParseTreeNode): TText {
  return {
    text: '', // provides default text
    ...omit(text, textLevelKeysToOmit),
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
