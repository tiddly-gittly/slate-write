import type { IDomParseTreeNode } from 'tiddlywiki';
import repeat from 'lodash/repeat';
import { convertNodes } from '../../traverse';
import { IContext } from '../..';

export function li(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  const listItemDot = context.listMode === 'ul' ? '*' : '#';
  // the `rest` here maybe another ol or ul, so we need to indent it by making it list element in the result
  const [textContent, ...rest] = convertNodes(context, children);
  return [`${repeat(listItemDot, context.indentLevels + 1)} ${textContent ?? ''}`, '\n', ...rest];
}
