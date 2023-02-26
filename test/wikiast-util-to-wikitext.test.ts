import { wikiAstToWikiText } from '../src/transform/wikiast-util-to-wikitext';
import { wikiAstDict, wikiTextDict } from './constants';

describe('wikiAstToWikiText', () => {
  test('it works', () => {
    expect(typeof wikiAstToWikiText).toBe('function');
    expect(wikiAstToWikiText([])).toBe('');
  });
});
describe('Transform node', () => {
  test('text', () => {
    expect(wikiAstToWikiText(wikiAstDict.text)).toEqual(wikiTextDict.text);
  });
});

describe('Transform tree', () => {
  test('p > text', () => {
    expect(wikiAstToWikiText(wikiAstDict['p > text'])).toEqual(wikiTextDict['p > text']);
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
  test('p basic sequence marks', () => {
    expect(wikiAstToWikiText(wikiAstDict['p basic sequence marks'])).toEqual(wikiTextDict['p basic sequence marks']);
  });
  test('ol > li > mark > text', () => {
    expect(wikiAstToWikiText(wikiAstDict['ol > li > mark > text'])).toEqual(wikiTextDict['ol > li > mark > text']);
  });
  test('ol > ol > p + empty p', () => {
    expect(wikiAstToWikiText(wikiAstDict['ol > ol > p + empty p'])).toEqual(wikiTextDict['ol > ol > p + empty p']);
  });
  test('ol + ol > ol > p', () => {
    expect(wikiAstToWikiText(wikiAstDict['ol + ol > ol > p'])).toEqual(wikiTextDict['ol + ol > ol > p']);
  });
  test('image', () => {
    expect(wikiAstToWikiText(wikiAstDict.image)).toEqual(wikiTextDict.image);
  });
  test('image with tooltip and width', () => {
    expect(wikiAstToWikiText(wikiAstDict['image with tooltip and width'])).toEqual(wikiTextDict['image with tooltip and width']);
  });
  test('transclude', () => {
    expect(wikiAstToWikiText(wikiAstDict.transclude)).toEqual(wikiTextDict.transclude);
  });
  test('list widget', () => {
    expect(wikiAstToWikiText(wikiAstDict['list widget'])).toEqual(wikiTextDict['list widget']);
  });
  test('list widget block', () => {
    expect(wikiAstToWikiText(wikiAstDict['list widget block'])).toEqual(wikiTextDict['list widget block']);
  });
  test('link', () => {
    expect(wikiAstToWikiText(wikiAstDict.link)).toEqual(wikiTextDict.link);
  });
  test('empty link', () => {
    expect(wikiAstToWikiText(wikiAstDict['empty link'])).toEqual(wikiTextDict['empty link']);
  });
  test('alias link', () => {
    expect(wikiAstToWikiText(wikiAstDict['alias link'])).toEqual(wikiTextDict['alias link']);
  });
  test('external link', () => {
    expect(wikiAstToWikiText(wikiAstDict['external link'])).toEqual(wikiTextDict['external link']);
  });
  test('link in a list', () => {
    expect(wikiAstToWikiText(wikiAstDict['link in a list'])).toEqual(wikiTextDict['link in a list']);
  });
  test('heading', () => {
    expect(wikiAstToWikiText(wikiAstDict.heading)).toEqual(wikiTextDict.heading);
  });
  test('rpn', () => {
    expect(wikiAstToWikiText(wikiAstDict.rpn)).toEqual(wikiTextDict.rpn);
  });
  test('macro alert', () => {
    expect(wikiAstToWikiText(wikiAstDict['macro alert'])).toEqual(wikiTextDict['macro alert']);
  });
  test('codeblock', () => {
    expect(wikiAstToWikiText(wikiAstDict.codeblock)).toEqual(wikiTextDict.codeblock);
  });
  test.only('tableGettingStarted', () => {
    expect(wikiAstToWikiText(wikiAstDict.tableGettingStarted)).toEqual(wikiTextDict.tableGettingStarted);
  });
  test('table', () => {
    expect(wikiAstToWikiText(wikiAstDict.table)).toEqual(wikiTextDict.table);
  });
  test('setDefine', () => {
    expect(wikiAstToWikiText(wikiAstDict.setDefine)).toEqual(wikiTextDict.setDefine);
  });
  /** new tests here generated using `npx zx scripts/test/add-new-test.mjs` */
});
