import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import { IContext } from '../..';

export function li(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  const listItemDot = context.listMode === 'ul' ? '*' : '#';
  const textContent = convertNodes(context, children).join('');
  return [`${listItemDot} ${textContent}`];
}
