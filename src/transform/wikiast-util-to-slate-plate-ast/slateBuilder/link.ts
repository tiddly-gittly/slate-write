import { LinkNodeData, TElement } from '@udecode/plate';
import type { ILinkParseTreeNode, ITextParseTreeNode } from 'tiddlywiki';
import pick from 'lodash/pick';

import { ISlateAstExtraTwMarkers } from '../../ast-common-types';
import { IContext } from '..';

export function link(context: IContext, node: ILinkParseTreeNode): TElement<LinkNodeData & ISlateAstExtraTwMarkers> {
  // we always have these attributes and child, even in empty link `[[]]`
  const {
    to: { value: to },
  } = node.attributes ?? {};
  const [{ text }] = (node.children as ITextParseTreeNode[]) ?? [];

  return {
    ...pick(node, ['orderedAttributes', 'attributes', 'isBlock']),
    type: 'a',
    'tw-type': 'link',
    url: to,
    children: [{ text }],
  };
}
