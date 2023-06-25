import type { IDomParseTreeNode } from 'tiddlywiki';
import repeat from 'lodash/repeat';
import find from 'unist-util-find';
import { convertNodes } from '../../traverse';
import { IContext } from '../..';

export function li(context: IContext, node: IDomParseTreeNode): string[] {
  const listItemDot = context.listMode === 'ul' ? '*' : '#';
  // the `rest` here maybe another ol or ul, so we need to indent it by making it list element in the result
  const childTextContent = convertNodes(context, node.children);
  /** only li that don't contain other li should generate a \n. Assign `tag: undefined` because otherwise `find` will find itself.  */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const isLeafLi = find({ ...node, tag: undefined }, { tag: 'li' }) === undefined;
  // add \n so list will change line automatically
  return [`${repeat(listItemDot, context.indentLevels + 1)} ${childTextContent.join('')}`, isLeafLi ? '\n' : ''];
}
