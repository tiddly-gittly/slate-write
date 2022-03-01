import { fromWikiText } from '../src/transform/wikiast-util-from-wikitext';

describe('fromWikiText', () => {
  test('it run without error', () => {
    expect(typeof fromWikiText).toBe('function');
    expect(fromWikiText('')).toStrictEqual([]);
  });
});
