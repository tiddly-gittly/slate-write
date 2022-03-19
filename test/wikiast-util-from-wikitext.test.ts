import { wikiAstFromWikiText } from '../src/transform/wikiast-util-from-wikitext';
import { wikiAstDict, wikiTextDict } from './constants';

describe('fromWikiText', () => {
  describe('In env without $tw', () => {
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      (global as any).$tw = undefined;
    });
    test("it should work in env that don't have $tw", () => {
      expect(typeof wikiAstFromWikiText).toBe('function');
      expect(wikiAstFromWikiText('')).toEqual([]);
    });
  });
  test('it run without error', () => {
    expect(wikiAstFromWikiText('')).toEqual([]);
  });
});

describe('fromWikiText', () => {
  test('p > text', () => {
    expect(wikiAstFromWikiText(wikiTextDict['p > text'])).toEqual(wikiAstDict['p > text']);
  });
  test('ul > li > text', () => {
    expect(wikiAstFromWikiText(wikiTextDict['ul > li > text'])).toEqual(wikiAstDict['ul > li > text']);
  });
  test('ol > li > text', () => {
    expect(wikiAstFromWikiText(wikiTextDict['ol > li > text'])).toEqual(wikiAstDict['ol > li > text']);
  });
  test('ol > ol > ol > li', () => {
    expect(wikiAstFromWikiText(wikiTextDict['ol > ol > ol > li'])).toEqual(wikiAstDict['ol > ol > ol > li']);
  });
  test('p + ol + blockquote > div + ol', () => {
    expect(wikiAstFromWikiText(wikiTextDict['p + ol + blockquote > div + ol'])).toEqual(wikiAstDict['p + ol + blockquote > div + ol']);
  });
  test('p basic sequence marks', () => {
    expect(wikiAstFromWikiText(wikiTextDict['p basic sequence marks'])).toEqual(wikiAstDict['p basic sequence marks']);
  });
  test('ol > li > mark > text', () => {
    expect(wikiAstFromWikiText(wikiTextDict['ol > li > mark > text'])).toEqual(wikiAstDict['ol > li > mark > text']);
  });
});
