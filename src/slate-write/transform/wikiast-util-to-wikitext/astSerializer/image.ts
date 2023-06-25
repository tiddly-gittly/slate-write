/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { ITextParseTreeNode } from 'tiddlywiki';
import { IContext } from '..';

export function image(context: IContext, node: ITextParseTreeNode): string[] {
  const width = node.attributes?.width !== undefined ? ` width=${String(node.attributes.width.value)}` : '';
  const whiteSpace = width ? ' ' : '';
  const tooltip = node.attributes?.tooltip !== undefined ? `${String(node.attributes.tooltip.value)}|` : '';
  const source = node.attributes?.source !== undefined ? node.attributes.source.value : '';
  return [`[img${width}${whiteSpace}[${tooltip}${String(source)}]]`];
}
