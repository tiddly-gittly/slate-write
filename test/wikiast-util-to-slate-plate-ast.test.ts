/* eslint-disable @typescript-eslint/dot-notation */
import { wikiAstToSlateAst } from '../src/transform/wikiast-util-to-slate-plate-ast';
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
  test('ul > li > text', () => {
    expect(wikiAstToSlateAst(wikiAstDict['ul > li > text'])).toEqual(slateDict['ul > li > text']);
  });
  test('ol > li > text', () => {
    expect(wikiAstToSlateAst(wikiAstDict['ol > li > text'])).toEqual(slateDict['ol > li > text']);
  });
  test.skip('ol > ol > ol > li', () => {
    expect(wikiAstToSlateAst(wikiAstDict['ol > ol > ol > li'])).toEqual(slateDict['ol > ol > ol > li']);
  });
});
