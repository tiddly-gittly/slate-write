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
  const jsxResult = isSelfClosing
    ? [`<${prefix}${tag} ${attributeList.map(({ name, value }) => `${name}="${value}"`).join(' ')}/>`]
    : [`<${prefix}${tag} ${attributeList.map(({ name, value }) => `${name}="${value}"`).join(' ')}>`, ...convertNodes(context, children), `</${prefix}${tag}>`];
  // block level texts are separated with \n
  return jsxResult;
}
