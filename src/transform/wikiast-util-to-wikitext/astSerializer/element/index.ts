import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';

import { a } from './a';
import { p } from './p';
import { div } from './div';
import { ul } from './ul';
import { li } from './li';
import { headings } from './h1';
import { blockquote } from './blockquote';
import { marks } from './marks';
import { IContext } from '../..';
export const elementBuilders = { a, p, div, ul, ol: ul, li, blockquote, ...marks, ...headings };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function element(context: IContext, node: IDomParseTreeNode): string[] {
  const { tag, children } = node as IDomParseTreeNode & { tag: keyof typeof elementBuilders };
  const { builders } = context;
  if (typeof builders[tag] === 'function') {
    return builders[tag](context, node);
  }
  return context.builders.jsx(context, node);
}
