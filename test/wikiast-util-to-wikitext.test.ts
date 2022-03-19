/* eslint-disable @typescript-eslint/dot-notation */
import { wikiAstToWikiText } from '../src/transform/wikiast-util-to-wikitext';
import { wikiAstToSlateAst } from '../src/transform/wikiast-util-to-slate-plate-ast';
import { slateDict, wikiAstDict, wikiTextDict } from './constants';

describe('wikiAstToWikiText', () => {
  test('it works', () => {
    expect(typeof wikiAstToWikiText).toBe('function');
    expect(wikiAstToWikiText([])).toBe('');
  });
});
describe('Transform node', () => {
  test('text', () => {
    expect(wikiAstToWikiText(wikiAstDict['text'])).toEqual(wikiTextDict['text']);
  });
});

describe('Transform tree', () => {
  test('p > text', () => {
    expect(wikiAstToWikiText(wikiAstDict['p > text'])).toEqual(wikiTextDict['p > text'] + '\n');
  });
  test('ul > li > text', () => {
    expect(wikiAstToWikiText(wikiAstDict['ul > li > text'])).toEqual(wikiTextDict['ul > li > text']);
  });
  test('ol > li > text', () => {
    expect(wikiAstToWikiText(wikiAstDict['ol > li > text'])).toEqual(wikiTextDict['ol > li > text']);
  });
  test('ol > ol > ol > li', () => {
    expect(wikiAstToWikiText(wikiAstDict['ol > ol > ol > li'])).toEqual(wikiTextDict['ol > ol > ol > li']);
  });
  test('p + ol + blockquote > div + ol', () => {
    expect(wikiAstToWikiText(wikiAstDict['p + ol + blockquote > div + ol'])).toEqual(wikiTextDict['p + ol + blockquote > div + ol']);
  });
});
