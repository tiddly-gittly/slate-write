import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';

import { p } from './p';
import { div } from './div';
import { ul } from './ul';
import { li } from './li';
import { blockquote } from './blockquote';
import { IContext } from '../..';
export const elementBuilders = { p, div, ul, ol: ul, li, blockquote };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function element(context: IContext, node: IDomParseTreeNode): string[] {
  const { tag, children } = node as IDomParseTreeNode & { tag: keyof typeof elementBuilders };
  const { builders } = context;
  if (typeof builders[tag] === 'function') {
    return builders[tag](context, node);
  }
  return [`<${tag}>`, ...convertNodes(context, children), `</${tag}>`];
}
