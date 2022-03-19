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
  // add empty line between list and following content
  // TODO: ol and inline blockquote don't need this, need to check sibling
  return context.indentLevels === -1 ? [...result, ''] : result;
}
