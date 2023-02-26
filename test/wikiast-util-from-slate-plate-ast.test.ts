import { IWikiASTNode } from 'tiddlywiki';
import { select } from 'unist-util-select';
import { wikiAstFromSlateAst } from '../src/transform/wikiast-util-from-slate-plate-ast';
import { slateDict, wikiAstDictWithoutPos } from './constants';
import { mapToNoPosNode } from '../src/transform/ast-utils/mapToNoPosNode';

describe('fromSlateAst', () => {
  test('it run without error', () => {
    expect(wikiAstFromSlateAst([])).toEqual([]);
  });

  test('p > text', () => {
    expect(wikiAstFromSlateAst(slateDict['p > text'])).toEqual(wikiAstDictWithoutPos['p > text']);
  });
  test('ol > li > text', () => {
    expect(wikiAstFromSlateAst(slateDict['ol > li > text'])).toEqual(wikiAstDictWithoutPos['ol > li > text']);
  });
  test('ul > li > text', () => {
    expect(wikiAstFromSlateAst(slateDict['ul > li > text'])).toEqual(wikiAstDictWithoutPos['ul > li > text']);
  });
  test('ol > ol > ol > li', () => {
    expect(wikiAstFromSlateAst(slateDict['ol > ol > ol > li'])).toEqual(wikiAstDictWithoutPos['ol > ol > ol > li']);
  });
  test('p + ol + blockquote > div + ol', () => {
    expect(wikiAstFromSlateAst(slateDict['p + ol + blockquote > div + ol'])).toEqual(wikiAstDictWithoutPos['p + ol + blockquote > div + ol']);
  });
  test('p basic sequence marks', () => {
    expect(wikiAstFromSlateAst(slateDict['p basic sequence marks'])).toEqual(wikiAstDictWithoutPos['p basic sequence marks']);
  });
  test('ol > li > mark > text', () => {
    expect(wikiAstFromSlateAst(slateDict['ol > li > mark > text'])).toEqual(wikiAstDictWithoutPos['ol > li > mark > text']);
  });
  test('ol > ol > p + empty p', () => {
    const result = wikiAstFromSlateAst(slateDict['ol > ol > p + empty p']);
    // in this case we are mainly testing wiki to slate's bad case, so in this slate to wiki, we need to adjust bad data in wikiast
    const emptyLicNode = select('element[tag=ol] > element[tag=li] > element[tag=ol] > element[tag=li]:nth-child(2)', result[0]);
    if (emptyLicNode !== null) {
      (emptyLicNode as IWikiASTNode).children = [];
    }
    expect(result).toEqual(wikiAstDictWithoutPos['ol > ol > p + empty p']);
  });
  test('ol + ol > ol > p', () => {
    expect(wikiAstFromSlateAst(slateDict['ol + ol > ol > p'])).toEqual(wikiAstDictWithoutPos['ol + ol > ol > p']);
  });
  test('image', () => {
    expect(wikiAstFromSlateAst(slateDict.image)).toEqual(wikiAstDictWithoutPos.image);
  });
  test('transclude', () => {
    expect(wikiAstFromSlateAst(slateDict.transclude)).toEqual(wikiAstDictWithoutPos.transclude);
  });
  test('list widget', () => {
    expect(wikiAstFromSlateAst(slateDict['list widget'])).toEqual(wikiAstDictWithoutPos['list widget']);
  });
  test('list widget block', () => {
    expect(wikiAstFromSlateAst(slateDict['list widget block'])).toEqual(wikiAstDictWithoutPos['list widget block']);
  });
  test('link', () => {
    expect(wikiAstFromSlateAst(slateDict.link)).toEqual(wikiAstDictWithoutPos.link);
  });
  test('empty link', () => {
    expect(wikiAstFromSlateAst(slateDict['empty link'])).toEqual(wikiAstDictWithoutPos['empty link']);
  });
  test('alias link', () => {
    expect(wikiAstFromSlateAst(slateDict['alias link'])).toEqual(wikiAstDictWithoutPos['alias link']);
  });
  test('external link', () => {
    expect(wikiAstFromSlateAst(slateDict['external link'])).toEqual(wikiAstDictWithoutPos['external link']);
  });
  test('link in a list', () => {
    expect(wikiAstFromSlateAst(slateDict['link in a list'])).toEqual(wikiAstDictWithoutPos['link in a list']);
  });
  test('heading', () => {
    expect(wikiAstFromSlateAst(slateDict.heading)).toEqual(wikiAstDictWithoutPos.heading);
  });
  test('rpn', () => {
    expect(wikiAstFromSlateAst(slateDict.rpn)).toEqual(wikiAstDictWithoutPos.rpn);
  });
  test('macro alert', () => {
    expect(wikiAstFromSlateAst(slateDict['macro alert'])).toEqual(wikiAstDictWithoutPos['macro alert']);
  });
  test('codeblock', () => {
    expect(wikiAstFromSlateAst(slateDict.codeblock)).toEqual(wikiAstDictWithoutPos.codeblock);
  });
  test.only('tableGettingStarted', () => {
    expect(wikiAstFromSlateAst(slateDict.tableGettingStarted)).toEqual(wikiAstDictWithoutPos.tableGettingStarted);
  });
  test('table', () => {
    expect(wikiAstFromSlateAst(slateDict.table)).toEqual(wikiAstDictWithoutPos.table);
  });
  test('setDefine', () => {
    expect(wikiAstFromSlateAst(slateDict.setDefine).map((ast) => mapToNoPosNode(ast))).toEqual(wikiAstDictWithoutPos.setDefine);
  });
  /** new tests here generated using `npx zx scripts/test/add-new-test.mjs` */
});
