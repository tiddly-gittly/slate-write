import { TElement } from '@udecode/plate';
import pick from 'lodash/pick';
import { IParseTreeNode } from 'tiddlywiki';
import { removeTypeFromAttributes } from './mapAttributes';

export function getWikiASTAdditionalProperties(node: IParseTreeNode) {
  const result = {
    ...pick(node, ['orderedAttributes', 'isBlock']),
  } as Partial<TElement>;
  if (node.attributes) {
    result.attributes = removeTypeFromAttributes(node.attributes);
    // store here, so we can retrieve it back later
    result['tw-attributes'] = node.attributes;
  }
  return result;
}
export function getSlatePlateASTAdditionalProperties(node: TElement) {
  const result: Partial<IParseTreeNode> = {
    ...pick(node, ['orderedAttributes', 'isBlock']),
  };
  if (node['tw-attributes']) {
    result.attributes = node['tw-attributes'];
  }
  return result;
}
