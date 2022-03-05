/* eslint-disable @typescript-eslint/dot-notation */
import { wikiAstToWikiText } from '../src/transform/wikiast-util-to-wikitext';
import { wikiAstToSlateAst } from '../src/transform/wikiast-util-to-slateast';
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
    expect(wikiAstToWikiText(wikiAstDict['p > text'])).toEqual(wikiTextDict['p > text']);
  });
});
