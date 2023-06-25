import { TElement } from '@udecode/plate-core';
import type { IDomParseTreeNode, ILinkParseTreeNode } from 'tiddlywiki';
import { IBuilders } from '..';
import { convertNodes } from '../../traverse';
import { ISlateAstExtraTwMarkers } from '../../../ast-common-types';
import pick from 'lodash/pick';

export function a(builders: IBuilders, node: TElement): ILinkParseTreeNode | IDomParseTreeNode {
  if (node['tw-type'] === 'link') {
    const typedNode = node as TElement & ISlateAstExtraTwMarkers & { attributes: Record<string, any>; isBlock: boolean };
    // we have a metadata to tell we can restore it to a `[[]]` link
    const result: ILinkParseTreeNode = {
      ...pick(typedNode, ['orderedAttributes', 'isBlock']),
      type: 'link',
      attributes: {
        ...typedNode.attributes,
        to: {
          type: 'string',
          value: typedNode.url as string,
        },
      },
      children: [
        {
          type: 'text',
          text: typedNode.children[0].text as string,
        },
      ],
    };
    return result;
  }
  const result: IDomParseTreeNode = {
    type: 'element',
    tag: 'a',
    // slate will add empty text child to it, we don't need that in wikiast
    children: node.children.length > 0 && (node.children[0].text !== '' || !('text' in node.children[0])) ? convertNodes(builders, node.children) : [],
  };
  return result;
}
