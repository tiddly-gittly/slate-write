import type { ILinkParseTreeNode, ITextParseTreeNode } from 'tiddlywiki';
import { IContext } from '..';

export interface ILinkOptions {
  prefix?: string;
}

export function link(context: IContext, node: ILinkParseTreeNode, options?: ILinkOptions): string[] {
  const { prefix = '' } = options ?? {};
  // we always have these attributes and child, even in empty link `[[]]`
  const {
    to: { value: to },
  } = node.attributes ?? {};
  const [{ text }] = (node.children as ITextParseTreeNode[]) ?? [];

  return [`[${prefix}[`, text, to !== text ? `|${to}` : '', `]]`];
}
