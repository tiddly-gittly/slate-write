import { LinkNodeData, TElement } from '@udecode/plate';
import type { IDomParseTreeNode, ILinkParseTreeNode } from 'tiddlywiki';
import { IBuilders } from '..';
import { convertNodes } from '../../traverse';
import { ISlateAstExtraTwMarkers } from '../../../ast-common-types';
import pick from 'lodash/pick';

export function a(builders: IBuilders, node: TElement): ILinkParseTreeNode | IDomParseTreeNode {
  if (node['tw-type'] === 'link') {
    node = node as TElement<LinkNodeData & ISlateAstExtraTwMarkers>;
    // we have a metadata to tell we can restore it to a `[[]]` link
    const result: ILinkParseTreeNode = {
      ...pick(node, ['orderedAttributes', 'isBlock']),
      type: 'link',
      attributes: {
        ...node.attributes,
        to: {
          type: 'string',
          value: node.url,
        },
      },
      children: [
        {
          type: 'text',
          text: node.children[0].text,
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
