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
});

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
});
