/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { ICustomParseTreeNode, IDomParseTreeNode } from 'tiddlywiki';
import { IContext } from '..';
import { convertNodes } from '../traverse';

export interface IJSXOptions {
  prefix?: string;
}
/**
 * Rendering tag like `<a />` is basically the same for widget and elements
 */
export function jsx(context: IContext, node: ICustomParseTreeNode | IDomParseTreeNode, options?: IJSXOptions): string[] {
  const { prefix = '' } = options ?? {};
  const { tag, isSelfClosing, orderedAttributes, attributes, children } = node;
  /** list of attributes, prevent `orderedAttributes` or `attributes` to be undefined */
  const attributeList =
    orderedAttributes !== undefined ? orderedAttributes : attributes !== undefined ? Object.keys(attributes).map((key) => attributes[key]) : [];
  const kvPairs = attributeList
    .map((attributeNode) => {
      const builder = context.builders[attributeNode.type];
      const value = builder(context, attributeNode).join('');
      // macro don't need a quote, otherwise it means escape
      const valueWithQuote = attributeNode.type === 'macro' ? value : `"${value}"`;
      return `${attributeNode.name}=${valueWithQuote}`;
    })
    .join(' ');
  const jsxResult = isSelfClosing
    ? [`<${prefix}${tag} ${kvPairs}/>`]
    : [`<${prefix}${tag} ${kvPairs}>`, ...convertNodes(context, children), `</${prefix}${tag}>`];
  // block level texts are separated with \n
  return jsxResult;
}
