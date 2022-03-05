import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../traverse';
import { IBuilders } from '.';
import { ElementElement } from '../../../../src/components/editor';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function html(builders: IBuilders, { type, tag, children }: ElementElement): IDomParseTreeNode {
  return {
    type,
    tag,
    children: convertNodes(builders, children),
  };
}
