import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import { IBuilders } from '..';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function p(builders: IBuilders, { type, tag, children }: IDomParseTreeNode): string[] {
  return convertNodes(builders, children);
}
