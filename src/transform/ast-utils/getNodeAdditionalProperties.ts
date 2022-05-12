/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TElement } from '@udecode/plate';
import pick from 'lodash/pick';
import { IParseTreeAttribute, IParseTreeNode } from 'tiddlywiki';
import { removeTypeFromAttributes } from './mapAttributes';

export function getWikiASTAdditionalProperties(node: IParseTreeNode) {
  const result = {
    ...pick(node, ['orderedAttributes', 'isBlock']),
  } as Partial<TElement>;
  if (node.attributes !== undefined) {
    result.attributes = removeTypeFromAttributes(node.attributes);
    // store here, so we can retrieve it back later
    result['tw-attributes'] = node.attributes;
  }
  return result;
}
export function getSlatePlateASTAdditionalProperties(
  node: TElement & { isBlock: boolean; orderedAttributes: IParseTreeAttribute[]; 'tw-attributes': Record<string, IParseTreeAttribute> },
) {
  const result: Partial<IParseTreeNode> = {
    ...pick(node, ['orderedAttributes', 'isBlock']),
  };
  if (node['tw-attributes']) {
    result.attributes = node['tw-attributes'];
  }
  return result;
}
