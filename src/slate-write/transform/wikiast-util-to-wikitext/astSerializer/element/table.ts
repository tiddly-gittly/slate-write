import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import { IContext } from '../..';

/**
 * table can be omitted
 */
export function table(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  return convertNodes(context, children);
}

/**
 * tbody can be omitted
 */
export function tbody(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  return convertNodes(context, children);
}

/**
 * tr starts with `|`, and concat the children with `|`
 */
export function tr(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  return ['|', ...convertNodes(context, children).join('|'), '|\n'];
}

/**
 * td can be omitted, just return the children with `\n`, so wikitext result will have \n\n
 */
export function td(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  return convertNodes(context, children);
}

export const tableTags = { table, tbody, tr, td };
