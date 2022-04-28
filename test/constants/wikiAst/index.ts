import { IDomParseTreeNode, IParseTreeNode } from 'tiddlywiki';
import mapValues from 'lodash/mapValues';
import { map } from 'unist-util-map';

import { p } from './p';
import { ol } from './ol';
import { image } from './image';
import { transclude } from './transclude';
import { widget } from './widget';

export const wikiAstDict: Record<string, IParseTreeNode[] | IParseTreeNode> = { ...p, ...ol, ...image, ...transclude, ...widget };

const mapToNoPosNode = (ast: IParseTreeNode): IParseTreeNode =>
  map(ast, (node) => {
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
  }) as unknown as IParseTreeNode;
export const wikiAstDictWithoutPos = mapValues(wikiAstDict, (ast) =>
  Array.isArray(ast) ? ast.map((aAst) => mapToNoPosNode(aAst)) : mapToNoPosNode(ast),
) as typeof wikiAstDict;
