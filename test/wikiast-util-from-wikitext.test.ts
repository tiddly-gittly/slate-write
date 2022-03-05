import { fromWikiText } from '../src/transform/wikiast-util-from-wikitext';
import { wikiAstDict, wikiTextDict } from './constants';

describe('fromWikiText', () => {
  describe('In env without $tw', () => {
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      (global as any).$tw = undefined;
    });
    test("it should work in env that don't have $tw", () => {
      expect(typeof fromWikiText).toBe('function');
      expect(fromWikiText('')).toEqual([]);
    });
  });
  test('it run without error', () => {
    expect(fromWikiText('')).toEqual([]);
  });
});

describe('fromWikiText', () => {
  test('p > text', () => {
    expect(fromWikiText(wikiTextDict['p > text'])).toEqual(wikiAstDict['p > text']);
  });
  test('ul > li > text', () => {
    expect(fromWikiText(wikiTextDict['ul > li > text'])).toEqual(wikiAstDict['ul > li > text']);
  });
  test('ol > li > text', () => {
    expect(fromWikiText(wikiTextDict['ol > li > text'])).toEqual(wikiAstDict['ol > li > text']);
  });
});
