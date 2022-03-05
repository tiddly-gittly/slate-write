import { fromWikiText } from '../src/transform/wikiast-util-from-wikitext';
import { wikiAstDict } from './constants';
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
describe('fromWikiText', () => {
  test('it run without error', () => {
    expect(fromWikiText('')).toEqual([]);
  });
  test('parse text', () => {
    expect(fromWikiText('AAA')).toEqual(wikiAstDict['p > text']);
  });
});
