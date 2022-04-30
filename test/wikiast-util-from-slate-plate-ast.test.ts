import { wikiAstToSlateAst } from '../src/transform/wikiast-util-to-slate-plate-ast';
import { wikiAstFromSlateAst } from '../src/transform/wikiast-util-from-slate-plate-ast';
import { slateDict, wikiAstDict, wikiAstDictWithoutPos } from './constants';

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
  test('image', () => {
    expect(wikiAstFromSlateAst(slateDict['image'])).toEqual(wikiAstDictWithoutPos['image']);
  });
  test('transclude', () => {
    expect(wikiAstFromSlateAst(slateDict['transclude'])).toEqual(wikiAstDictWithoutPos['transclude']);
  });
  test('list widget', () => {
    expect(wikiAstFromSlateAst(slateDict['list widget'])).toEqual(wikiAstDictWithoutPos['list widget']);
  });
  test('list widget block', () => {
    expect(wikiAstFromSlateAst(slateDict['list widget block'])).toEqual(wikiAstDictWithoutPos['list widget block']);
  });
  test('link', () => {
    expect(wikiAstFromSlateAst(slateDict['link'])).toEqual(wikiAstDictWithoutPos['link']);
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
    expect(wikiAstFromSlateAst(slateDict['heading'])).toEqual(wikiAstDictWithoutPos['heading']);
  });
});
