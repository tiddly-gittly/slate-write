import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import { IContext } from '../..';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function li(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  return convertNodes(context, children);
}
