import { IDomParseTreeNode, IParseTreeNode } from 'tiddlywiki';
import { cloneDeep } from 'lodash';
import { ElementElement } from '../src/components/editor';
import * as slate from '../src/transform/slate';

export const wikiTextDict: Record<string, string> = {
  text: 'AAA',
  'p > text': 'AAA',
  'ol > li > text': `# AAA
# BBB
# CCC`,
  'ul > li > text': `* AAA
* BBB
* CCC`,
};
export const slateDict: Record<string, slate.Node[]> = {
  text: [{ text: 'AAA' }],
  'p > text': [{ type: 'element', tag: 'p', children: [{ text: 'AAA' }] }],
  'ul > li > text': [
    {
      type: 'element',
      tag: 'ul',
      children: [
        {
          type: 'element',
          tag: 'li',
          children: [
            {
              text: 'AAA',
            },
          ],
        },
        {
          type: 'element',
          tag: 'li',
          children: [
            {
              text: 'BBB',
            },
          ],
        },
        {
          type: 'element',
          tag: 'li',
          children: [
            {
              text: 'CCC',
            },
          ],
        },
      ],
    },
  ],
};
slateDict['ol > li > text'] = cloneDeep(slateDict['ul > li > text']);
(slateDict['ol > li > text'] as ElementElement[])[0].tag = 'ol';

export const wikiAstDict: Record<string, IParseTreeNode[] | IParseTreeNode> = {
  text: { type: 'text', text: 'AAA', start: 0, end: 3 },
  'p > text': [{ type: 'element', tag: 'p', children: [{ type: 'text', text: 'AAA', start: 0, end: 3 }], start: 0, end: 3 }],
  'ul > li > text': [
    {
      type: 'element',
      tag: 'ul',
      children: [
        {
          type: 'element',
          tag: 'li',
          children: [
            {
              type: 'text',
              text: 'AAA',
              start: 2,
              end: 5,
            },
          ],
        },
        {
          type: 'element',
          tag: 'li',
          children: [
            {
              type: 'text',
              text: 'BBB',
              start: 8,
              end: 11,
            },
          ],
        },
        {
          type: 'element',
          tag: 'li',
          children: [
            {
              type: 'text',
              text: 'CCC',
              start: 14,
              end: 17,
            },
          ],
        },
      ],
    },
  ],
};
wikiAstDict['ol > li > text'] = cloneDeep(wikiAstDict['ul > li > text']);
(wikiAstDict['ol > li > text'] as IDomParseTreeNode[])[0].tag = 'ol';
