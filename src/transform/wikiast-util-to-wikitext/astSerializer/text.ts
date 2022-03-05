import type { ITextParseTreeNode } from 'tiddlywiki';
import { IBuilders } from '.';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function text(builders: IBuilders, node: ITextParseTreeNode): string[] {
  return [node.text];
}
