import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import { IContext } from '../..';

export function ul(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  // the initial indentation is -1, so we can add 1
  context.indentLevels += 1;
  context.listMode = tag as 'ul' | 'ol';
  const result = convertNodes(context, children);
  context.indentLevels -= 1;
  context.listMode = undefined;
  // DEBUG: console
  console.log(`result`, result);
  return [...result, '\n'];
}
