import { IParseTreeNode } from 'tiddlywiki';
import mapValues from 'lodash/mapValues';
import cloneDeep from 'lodash/cloneDeep';

import { p } from './p';
import { ol } from './ol';
import { link } from './link';
import { image } from './image';
import { transclude } from './transclude';
import { widget } from './widget';
import { mapToNoPosNode } from '../../../src/transform/ast-utils/mapToNoPosNode';

export const wikiAstDict: Record<string, IParseTreeNode[] | IParseTreeNode> = { ...p, ...ol, ...image, ...transclude, ...widget, ...link };

export const wikiAstDictWithoutPos = mapValues(cloneDeep(wikiAstDict), (ast: IParseTreeNode | IParseTreeNode[]) =>
  Array.isArray(ast) ? ast.map((aAst) => mapToNoPosNode(aAst)) : mapToNoPosNode(ast),
) as typeof wikiAstDict;
