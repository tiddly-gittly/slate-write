/* eslint-disable @typescript-eslint/dot-notation */
import { wikiAstToSlateAst } from '../src/transform/wikiast-util-to-slateast';
import { slateDict, wikiAstDict } from './constants';

describe('Transform node', () => {
  test('wikiAstToSlateAst callable', () => {
    expect(typeof wikiAstToSlateAst).toBe('function');
  });
  test('text', () => {
    expect(wikiAstToSlateAst(wikiAstDict['text'])).toEqual(slateDict['text']);
  });
});

describe('Transform tree', () => {
  test('p > text', () => {
    expect(wikiAstToSlateAst(wikiAstDict['p > text'])).toEqual(slateDict['p > text']);
  });
});
