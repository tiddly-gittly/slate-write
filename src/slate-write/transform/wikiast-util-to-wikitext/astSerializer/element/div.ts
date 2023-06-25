import type { IDomParseTreeNode } from 'tiddlywiki';
import repeat from 'lodash/repeat';
import { convertNodes } from '../../traverse';
import { IContext } from '../..';

/**
 * Div can be omitted, just return the children
 */
export function div(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  return convertNodes(context, children);
}
