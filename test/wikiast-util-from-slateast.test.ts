import { wikiAstToSlateAst } from '../src/transform/wikiast-util-to-slateast';
import { wikiAstFromSlateAst } from '../src/transform/wikiast-util-from-slateast';
import { slateDict, wikiAstDict } from './constants';

describe('fromSlateAst', () => {
  test('it run without error', () => {
    expect(wikiAstFromSlateAst([])).toEqual([]);
  });

  test('p > text', () => {
    expect(wikiAstToSlateAst(wikiAstDict['p > text'])).toEqual(slateDict['p > text']);
  });
  test('ol > li > text', () => {
    expect(wikiAstToSlateAst(wikiAstDict['ol > li > text'])).toEqual(slateDict['ol > li > text']);
  });
  test('ul > li > text', () => {
    expect(wikiAstToSlateAst(wikiAstDict['ul > li > text'])).toEqual(slateDict['ul > li > text']);
  });
  test('ol > ol > ol > li', () => {
    expect(wikiAstToSlateAst(wikiAstDict['ol > ol > ol > li'])).toEqual(slateDict['ol > ol > ol > li']);
  });
});

describe('Identical', () => {
  test('p > text', () => {
    expect(wikiAstDict['p > text']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDict['p > text'])));
  });
  test('ol > li > text', () => {
    expect(wikiAstDict['ol > li > text']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDict['ol > li > text'])));
  });
  test('ul > li > text', () => {
    expect(wikiAstDict['ul > li > text']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDict['ul > li > text'])));
  });
  test('ol > ol > ol > li', () => {
    expect(wikiAstDict['ol > ol > ol > li']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDict['ol > ol > ol > li'])));
  });
});
