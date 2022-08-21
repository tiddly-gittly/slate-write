import { TElement } from '@udecode/plate-core';
import type { ILinkParseTreeNode, ITextParseTreeNode } from 'tiddlywiki';

import { ISlateAstExtraTwMarkers } from '../../ast-common-types';
import { IContext } from '..';

export function link(context: IContext, node: ILinkParseTreeNode): TElement & ISlateAstExtraTwMarkers {
  // we always have these attributes and child, even in empty link `[[]]`
  const {
    to: { value: to },
  } = node.attributes ?? {};
  const [{ text }] = (node.children as ITextParseTreeNode[]) ?? [];

  return {
    type: 'a',
    'tw-type': 'link',
    url: to,
    children: [{ text }],
  };
}
