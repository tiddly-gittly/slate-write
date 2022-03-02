import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Html = ReturnType<typeof html>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function html(builders: IBuilders, { type, tag, children }: IDomParseTreeNode, deco: Decoration) {
  return {
    type,
    tag,
    children: convertNodes(builders, children, deco),
  };
}
