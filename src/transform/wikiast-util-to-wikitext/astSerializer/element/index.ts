import type { IDomParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../../traverse';
import { IBuilders } from '..';

import { p } from './p';
export const elementBuilders = { p };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function element(builders: IBuilders & typeof elementBuilders, node: IDomParseTreeNode): string[] {
  const { tag, children } = node as IDomParseTreeNode & { tag: keyof typeof elementBuilders };
  if (typeof builders[tag] === 'function') {
    return builders[tag](builders, node);
  }
  return [`<${tag}>`, ...convertNodes(builders, children), `</${tag}>`];
}
