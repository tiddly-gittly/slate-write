import type { IDomParseTreeNode } from 'tiddlywiki';
import { IBuilders } from '..';
import { convertNodes } from '../../traverse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function ul(builders: IBuilders, node: IDomParseTreeNode) {
  const { type, tag, children } = node;
  return {
    type,
    tag,
    children: convertNodes(builders, children),
  };
}
