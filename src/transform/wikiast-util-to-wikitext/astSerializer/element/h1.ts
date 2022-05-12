/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import repeat from 'lodash/repeat';
import type { IDomParseTreeNode } from 'tiddlywiki';
import { IContext } from '../..';
import { convertNodes } from '../../traverse';

/**
 * Basic h1 tag will turn into `! xxx`
 */
export function h1(context: IContext, node: IDomParseTreeNode): string[] {
  const { attributes, children, tag } = node;
  if (!attributes?.class?.value) {
    // don't need a html tag to render
    const level = Number(tag.replace('h', ''));
    return [repeat('!', level), ' ', ...convertNodes(context, children), '\n'];
  }
  // is real a tag
  const jsxResult = context.builders.jsx(context, node);
  return jsxResult;
}

export const headings = { h1, h2: h1, h3: h1, h4: h1, h5: h1, h6: h1 };
