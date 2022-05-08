import type { ITextParseTreeNode } from 'tiddlywiki';
import { IContext } from '..';

export function image(context: IContext, node: ITextParseTreeNode): string[] {
  const width = node.attributes?.width != undefined ? ` width=${node.attributes.width.value}` : '';
  const whiteSpace = width ? ' ' : '';
  const tooltip = node.attributes?.tooltip != undefined ? `${node.attributes.tooltip.value}|` : '';
  const source = node.attributes?.source != undefined ? node.attributes.source.value : '';
  return [`[img${width}${whiteSpace}[${tooltip}${source}]]`];
}
