import { IParseTreeNode } from 'tiddlywiki';
import mapValues from 'lodash/mapValues';
import cloneDeep from 'lodash/cloneDeep';

import { mapToNoPosNode } from '../../../src/transform/ast-utils/mapToNoPosNode';

import { p } from './p';
import { ol } from './ol';
import { link } from './link';
import { image } from './image';
import { codeblock } from './codeblock';
import { transclude } from './transclude';
import { widget } from './widget';
import { heading } from './heading';
import { macro } from './macro';
import { table } from './table';
import { set } from './set';

export const wikiAstDict: Record<string, IParseTreeNode[] | IParseTreeNode> = {
  ...p,
  ...ol,
  ...image,
  ...codeblock,
  ...transclude,
  ...widget,
  ...link,
  ...heading,
  ...macro,
  ...table,
  ...set,
};

export const wikiAstDictWithoutPos = mapValues(cloneDeep(wikiAstDict), (ast: IParseTreeNode | IParseTreeNode[]) =>
  Array.isArray(ast) ? ast.map((aAst) => mapToNoPosNode(aAst)) : mapToNoPosNode(ast),
) as typeof wikiAstDict;
