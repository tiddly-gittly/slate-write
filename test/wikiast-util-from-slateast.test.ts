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
});
