import type { IDomParseTreeNode } from 'tiddlywiki';
import repeat from 'lodash/repeat';
import { convertNodes } from '../../traverse';
import { IContext } from '../..';

export function li(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  const listItemDot = context.listMode === 'ul' ? '*' : '#';
  // the `rest` here maybe another ol or ul, so we need to indent it by making it list element in the result
  const childTextContent = convertNodes(context, children);
  // add \n so list will change line automatically
  return [`${repeat(listItemDot, context.indentLevels + 1)} ${childTextContent.join('')}`, '\n'];
}
