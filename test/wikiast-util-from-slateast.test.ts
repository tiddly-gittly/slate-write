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
});

describe('Identical', () => {
  test('p > text', () => {
    expect(wikiAstDict['p > text']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDict['p > text'])));
  });
});
