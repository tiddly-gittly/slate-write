import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import { IContext } from '../..';
import { dropExtraTailingN } from '../../tokenStreamUtils/dropExtraTailingN';

export function ul(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  // the initial indentation is -1, so we can add 1
  context.indentLevels += 1;
  /** Are we already in a list, so currently is a list-in-list? */
  const alreadyInList = context.listMode !== undefined;
  context.listMode = tag as 'ul' | 'ol';
  const result = convertNodes(context, children);
  context.indentLevels -= 1;
  context.listMode = undefined;
  // TODO: ol and inline blockquote don't need this, need to check sibling
  const listResultWithN =
    context.indentLevels === -1
      ? // add empty line between list and following non-list content
        [...dropExtraTailingN(result), '\n']
      : // change line if we are nested list (means this ol is inside a li, and should change line), see test case `ol > li > mark > text` for example
        [alreadyInList ? '\n' : '', ...result];

  return listResultWithN;
}
