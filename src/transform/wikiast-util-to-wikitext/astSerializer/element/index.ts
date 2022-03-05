import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';

import { p } from './p';
import { ul } from './ul';
import { IContext } from '../..';
export const elementBuilders = { p, ul, ol: ul };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function element(context: IContext, node: IDomParseTreeNode): string[] {
  const { tag, children } = node as IDomParseTreeNode & { tag: keyof typeof elementBuilders };
  const { builders } = context;
  if (typeof builders[tag] === 'function') {
    return builders[tag](context, node);
  }
  return [`<${tag}>`, ...convertNodes(context, children), `</${tag}>`];
}
