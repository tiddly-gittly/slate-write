import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import type { IContext, IWithParent } from '../..';
import { dropExtraTailingN } from '../../../token-stream-utils/dropExtraTailingN';

export function ul(context: IContext, { tag, children, parent }: IDomParseTreeNode & IWithParent): string[] {
  // the initial indentation is -1, so we can add 1
  context.indentLevels += 1;
  /** Are we already in a list, so currently is a list-in-list? */
  const alreadyInList = context.listMode !== undefined;
  context.listMode = tag as 'ul' | 'ol';
  const result = convertNodes(context, children);
  context.indentLevels -= 1;
  // if next sibling is not a list, we quit the list mode
  const tagOfNextSibling = (parent?.children?.[context.index] as IDomParseTreeNode | undefined)?.tag;
  if (tagOfNextSibling !== 'ul' && tagOfNextSibling !== 'ol' && tagOfNextSibling !== 'li') {
    context.listMode = undefined;
  }
  /**
   * Add extra \n if we are top level list, and next sibling is not a list
   * // TODO: only inline blockquote don't need this, but block level blockquote needs, need to check sibling's children
   */
  let needExtraN = false;
  if (context.indentLevels === -1) {
    needExtraN = !(((tagOfNextSibling === 'ul' || tagOfNextSibling === 'ol') && tagOfNextSibling !== tag) || tagOfNextSibling === 'blockquote');
  }
  const listResultWithN = needExtraN
    ? // add empty line between list and following non-list content
      [...dropExtraTailingN(result), '\n']
    : // change line if we are nested list (means this ol is inside a li, and should change line), see test case `ol > li > mark > text` for example
      [alreadyInList ? '\n' : '', ...result];

  return listResultWithN;
}
