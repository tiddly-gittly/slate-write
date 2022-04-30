import { wikiAstToSlateAst } from '../src/transform/wikiast-util-to-slate-plate-ast';
import { wikiAstFromSlateAst } from '../src/transform/wikiast-util-from-slate-plate-ast';
import { slateDict, wikiAstDict, wikiAstDictWithoutPos } from './constants';

describe('Identical', () => {
  test('p > text', () => {
    expect(wikiAstDict['p > text']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['p > text'])));
  });
  test('ol > li > text', () => {
    expect(wikiAstDict['ol > li > text']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['ol > li > text'])));
  });
  test('ul > li > text', () => {
    expect(wikiAstDict['ul > li > text']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['ul > li > text'])));
  });
  test('ol > ol > ol > li', () => {
    expect(wikiAstDict['ol > ol > ol > li']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['ol > ol > ol > li'])));
  });
  test('p + ol + blockquote > div + ol', () => {
    expect(wikiAstDict['p + ol + blockquote > div + ol']).toMatchObject(
      wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['p + ol + blockquote > div + ol'])),
    );
  });
  test('p basic sequence marks', () => {
    expect(wikiAstDict['p basic sequence marks']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['p basic sequence marks'])));
  });
  test('ol > li > mark > text', () => {
    expect(wikiAstDict['ol > li > mark > text']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['ol > li > mark > text'])));
  });
  test('image', () => {
    expect(wikiAstDict['image']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['image'])));
  });
  test('transclude', () => {
    expect(wikiAstDict['transclude']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['transclude'])));
  });
  test('list widget', () => {
    expect(wikiAstDict['list widget']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['list widget'])));
  });
  test('list widget block', () => {
    expect(wikiAstDict['list widget block']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['list widget block'])));
  });
  test('link', () => {
    expect(wikiAstDict['link']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['link'])));
  });
  test('empty link', () => {
    expect(wikiAstDict['empty link']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['empty link'])));
  });
  test('alias link', () => {
    expect(wikiAstDict['alias link']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['alias link'])));
  });
  test('external link', () => {
    expect(wikiAstDict['external link']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['external link'])));
  });
  test('link in a list', () => {
    expect(wikiAstDict['link in a list']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['link in a list'])));
  });
  test('heading', () => {
    expect(wikiAstDict['heading']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['heading'])));
  });
});
