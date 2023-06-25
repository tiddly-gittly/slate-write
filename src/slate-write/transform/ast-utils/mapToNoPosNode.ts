import { IMacroCallParseTreeNode, IParseTreeAttribute, IParseTreeNode, IWikiASTNode } from 'tiddlywiki';
import mapValues from 'lodash/mapValues';
import { map } from 'unist-util-map';

const removeStartEnd = <T extends ({ end?: number; start?: number } & Record<string, any>) | IParseTreeNode>(node: T): T => {
  let newNode = node;
  if ('start' in newNode) {
    newNode = Object.assign({}, newNode);
    delete (newNode as IParseTreeNode).start;
  }
  if ('end' in node) {
    newNode = Object.assign({}, newNode);
    delete (newNode as IParseTreeNode).end;
  }
  // keys alone side with `start` `end` and not with `children`, that cant be walked by `map(ast)`
  const recordKeys = ['value'] as const;
  const arrayKeys = ['params'] as const;
  for (const key of recordKeys) {
    if (key in node) {
      const attributeNode = node as IParseTreeAttribute;
      const value = attributeNode[key];
      if (typeof value !== 'string') {
        (newNode as IParseTreeAttribute)[key] = removeStartEnd(value);
      }
    }
  }
  for (const key of arrayKeys) {
    if (key in node) {
      const attributeNode = node as IMacroCallParseTreeNode;
      const value = attributeNode[key];
      if (value !== undefined && typeof value !== 'string') {
        (newNode as IMacroCallParseTreeNode)[key] = value.map((item) => removeStartEnd(item));
      }
    }
  }
  return newNode;
};
export const mapToNoPosNode = (ast: IWikiASTNode): IParseTreeNode =>
  map(ast, (node) => {
    const newNode = removeStartEnd(node);

    // keys alone side with `children`
    const recordKeys = ['attributes'] as const;
    const arrayKeys = ['orderedAttributes'] as const;
    for (const key of recordKeys) {
      if (newNode[key] !== undefined) {
        newNode[key] = mapValues(newNode[key], (item) => removeStartEnd(item));
      }
    }
    for (const key of arrayKeys) {
      if (newNode[key] !== undefined) {
        newNode[key] = newNode[key]!.map((item) => removeStartEnd(item));
      }
    }
    return newNode;
  }) as unknown as IParseTreeNode;
