import type { IDomParseTreeNode } from 'tiddlywiki';
import repeat from 'lodash/repeat';
import { convertNodes } from '../../traverse';
import { IContext } from '../..';

/**
 * Make two types of blockquote:
 * 1. blockquote > p: <<< xxx <<<
 * 2. blockquote > div: > xxx > xxx
 */
export function blockquote(context: IContext, { type, tag, children }: IDomParseTreeNode): string[] {
  if (children === undefined || children.length === 0) {
    return [];
  }
  // in `blockquote > div` case, each children have same type div, so we only check first children
  if ((children[0] as IDomParseTreeNode).tag === 'div') {
    const texts = convertNodes(context, children);
    return texts.map((line) => `> ${line}\n`);
  }
  // in `blockquote > p` case, some children will be other type like `IMacroCallParseTreeNode`, but we just convert all children by their own converters
  // TODO: add class name in attributes
  return [`<<<`, ...convertNodes(context, children), `<<<`, '\n'];
}
