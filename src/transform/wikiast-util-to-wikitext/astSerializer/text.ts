import type { ITextParseTreeNode } from 'tiddlywiki';
import { IContext } from '..';

export function text(context: IContext, node: ITextParseTreeNode): string[] {
  return [node.text];
}
