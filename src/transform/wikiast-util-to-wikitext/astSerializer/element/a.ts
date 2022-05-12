/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { IDomParseTreeNode, ILinkParseTreeNode } from 'tiddlywiki';
import { IContext } from '../..';

/**
 * A may need to transform back to `[ext[xxx|yyy]]`, but may be just real `<a />`
 */
export function a(context: IContext, node: IDomParseTreeNode): string[] {
  const { attributes, children } = node;
  if (attributes?.class?.value?.includes('tc-tiddlylink-external')) {
    // is `[ext[xxx]]` link
    return context.builders.link(
      context,
      {
        type: 'link',
        attributes: {
          to: attributes.href,
        },
        children,
      } as ILinkParseTreeNode,
      { prefix: 'ext' },
    );
  }
  // is real a tag
  const jsxResult = context.builders.jsx(context, node);
  return jsxResult;
}
