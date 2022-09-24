import type { IDomParseTreeNode } from 'tiddlywiki';

import { a } from './a';
import { p } from './p';
import { div } from './div';
import { ul } from './ul';
import { li } from './li';
import { headings } from './h1';
import { blockquote } from './blockquote';
import { marks } from './marks';
import { tableTags } from './table';
import type { IContext, IWithParent } from '../..';
export const elementBuilders = { a, p, div, ul, ol: ul, li, blockquote, ...marks, ...headings, ...tableTags };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function element(context: IContext, node: IDomParseTreeNode & IWithParent): string[] {
  const { tag } = node as IDomParseTreeNode & { tag: keyof typeof elementBuilders };
  const { builders } = context;
  if (typeof builders[tag] === 'function') {
    return builders[tag](context, node);
  }
  return builders.jsx(context, node);
}
