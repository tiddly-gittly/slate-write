import { IParseTreeNode } from 'tiddlywiki';
import mapValues from 'lodash/mapValues';
import { map } from 'unist-util-map';

const removeStartEnd = (node: { start?: number; end?: number }) => {
  let newNode = node;
  if ('start' in newNode) {
    newNode = Object.assign({}, newNode);
    delete (newNode as IParseTreeNode).start;
  }
  if ('end' in node) {
    newNode = Object.assign({}, newNode);
    delete (newNode as IParseTreeNode).end;
  }
  return newNode;
};
export const mapToNoPosNode = (ast: IParseTreeNode): IParseTreeNode =>
  map(ast, (node) => {
    let newNode = removeStartEnd(node as IParseTreeNode) as IParseTreeNode;
    if (newNode.attributes !== undefined) {
      newNode.attributes = mapValues(newNode.attributes, (item) => removeStartEnd(item)) as IParseTreeNode['attributes'];
    }
    if (newNode.orderedAttributes !== undefined) {
      newNode.orderedAttributes = newNode.orderedAttributes.map((item) => removeStartEnd(item)) as IParseTreeNode['orderedAttributes'];
    }
    return newNode;
  }) as unknown as IParseTreeNode;
