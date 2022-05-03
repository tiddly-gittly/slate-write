import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import { IContext } from '../..';

/**
 * P can be omitted, just return the children with `\n`, so wikitext result will have \n\n
 */
export function p(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  return [...convertNodes(context, children), '\n'];
}
