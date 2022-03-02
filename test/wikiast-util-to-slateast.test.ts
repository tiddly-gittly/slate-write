import { IDomParseTreeNode, ITextParseTreeNode } from 'tiddlywiki';
import { wikiAstToSlateAst } from '../src/transform/wikiast-util-to-slateast';
import * as slate from '../src/transform/slate';

describe('Transform node', () => {
  test('wikiAstToSlateAst callable', () => {
    expect(typeof wikiAstToSlateAst).toBe('function');
  });
  test('text', () => {
    const root: ITextParseTreeNode = { type: 'text', text: 'AAA', start: 0, end: 3 };
    const result: slate.Text[] = [{ text: 'AAA' }];
    expect(wikiAstToSlateAst(root)).toEqual(result);
  });
});

describe('Transform tree', () => {
  test('p > text', () => {
    const root: IDomParseTreeNode[] = [{ type: 'element', tag: 'p', children: [{ type: 'text', text: 'AAA', start: 0, end: 3 }], start: 0, end: 3 }];
    const result: slate.Element[] = [{ type: 'element', tag: 'p', children: [{ text: 'AAA' }] }];
    expect(wikiAstToSlateAst(root)).toEqual(result);
  });
});
