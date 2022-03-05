import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import { IContext } from '../..';

export function p(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  return [...convertNodes(context, children), '\n'];
}
