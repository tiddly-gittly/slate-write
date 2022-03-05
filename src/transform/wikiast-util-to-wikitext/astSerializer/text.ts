import type { ITextParseTreeNode } from 'tiddlywiki';
import { IContext } from '..';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function text(context: IContext, node: ITextParseTreeNode): string[] {
  return [node.text];
}
