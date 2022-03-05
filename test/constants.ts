import { IParseTreeNode } from 'tiddlywiki';
import * as slate from '../src/transform/slate';

export const slateDict: Record<string, slate.Node[]> = {
  text: [{ text: 'AAA' }],
  'p > text': [{ type: 'element', tag: 'p', children: [{ text: 'AAA' }] }],
};
export const wikiAstDict: Record<string, IParseTreeNode[] | IParseTreeNode> = {
  text: { type: 'text', text: 'AAA', start: 0, end: 3 },
  'p > text': [{ type: 'element', tag: 'p', children: [{ type: 'text', text: 'AAA', start: 0, end: 3 }], start: 0, end: 3 }],
};
