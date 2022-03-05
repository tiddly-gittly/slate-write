import type { IDomParseTreeNode } from 'tiddlywiki';
import repeat from 'lodash/repeat';
import { convertNodes } from '../../traverse';
import { IContext } from '../..';

export function ul(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  // the initial indentation is -1, so we can add 1
  context.indentLevels += 1;
  context.listMode = tag as 'ul' | 'ol';
  const indentCount = context.indentLevels * 2;
  const result = convertNodes(context, children).map((line) => repeat('  ', indentCount) + line);
  context.indentLevels -= 1;
  context.listMode = undefined;
  return [...result, '\n'];
}
