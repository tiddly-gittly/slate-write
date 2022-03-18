/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { IDomParseTreeNode, IParseTreeNode } from 'tiddlywiki';
import cloneDeep from 'lodash/cloneDeep';
import mapValues from 'lodash/mapValues';
import { TEditor, TElement, TText } from '@udecode/plate';
import { map } from 'unist-util-map';

export const wikiTextDict: Record<string, string> = {
  text: 'AAA',
  'p > text': 'AAA',
  'ol > li > text': `# AAA
# BBB
# CCC`,
  'ul > li > text': `* AAA
* BBB
* CCC`,
  'ol > ol > ol > li': `# AAA
## BBB
### CCC`,
};
export const slateDict: Record<string, TEditor | TElement | TText | Array<TEditor | TElement | TText>> = {
  text: [{ text: 'AAA' }],
  'p > text': { type: 'p', children: [{ text: 'AAA' }] },
  'ul > li > text': {
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [
          {
            type: 'lic',
            children: [
              {
                text: 'AAA',
              },
            ],
          },
        ],
      } as TElement,
      {
        type: 'li',
        children: [
          {
            type: 'lic',
            children: [
              {
                text: 'BBB',
              },
            ],
          },
        ],
      },
      {
        type: 'li',
        children: [
          {
            type: 'lic',
            children: [
              {
                text: 'CCC',
              },
            ],
          },
        ],
      },
    ],
  },
  'ol > ol > ol > li': {
    type: 'ol',
    children: [
      {
        type: 'li',
        children: [
          {
            type: 'lic',
            children: [
              {
                text: 'AAA',
              },
            ],
          } as TElement,
          {
            type: 'ol',
            children: [
              {
                type: 'li',
                children: [
                  {
                    type: 'lic',
                    children: [
                      {
                        text: 'BBB',
                      },
                    ],
                  },
                  {
                    type: 'ol',
                    children: [
                      {
                        type: 'li',
                        children: [
                          {
                            type: 'lic',
                            children: [
                              {
                                text: 'CCC',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          } as TElement,
        ],
      },
    ],
  },
};
slateDict['ol > li > text'] = cloneDeep(slateDict['ul > li > text']);
(slateDict['ol > li > text'] as TElement).type = 'ol';

export const wikiAstDict: Record<string, IParseTreeNode[] | IParseTreeNode> = {
  text: { type: 'text' as const, text: 'AAA', start: 0, end: 3 },
  'p > text': [{ type: 'element', tag: 'p', children: [{ type: 'text' as const, text: 'AAA', start: 0, end: 3 }], start: 0, end: 3 }],
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
              type: 'text' as const,
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
              type: 'text' as const,
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
              type: 'text' as const,
              text: 'CCC',
              start: 14,
              end: 17,
            },
          ],
        },
      ],
    },
  ],
  'ol > ol > ol > li': [
    {
      type: 'element',
      tag: 'ol',
      children: [
        {
          type: 'element',
          tag: 'li',
          children: [
            {
              type: 'text' as const,
              text: 'AAA',
              start: 2,
              end: 5,
            },
            {
              type: 'element',
              tag: 'ol',
              children: [
                {
                  type: 'element',
                  tag: 'li',
                  children: [
                    {
                      type: 'text' as const,
                      text: 'BBB',
                      start: 9,
                      end: 12,
                    },
                    {
                      type: 'element',
                      tag: 'ol',
                      children: [
                        {
                          type: 'element',
                          tag: 'li',
                          children: [
                            {
                              type: 'text' as const,
                              text: 'CCC',
                              start: 17,
                              end: 20,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
wikiAstDict['ol > li > text'] = cloneDeep(wikiAstDict['ul > li > text']);
(wikiAstDict['ol > li > text'] as IDomParseTreeNode[])[0].tag = 'ol';

const mapToNoPosNode = (ast: IParseTreeNode): IParseTreeNode =>
  map(ast, (node) => {
    let newNode = node;
    if ('start' in newNode) {
      newNode = Object.assign({}, newNode);
      delete (newNode as IParseTreeNode).start;
    }
    if ('end' in node) {
      newNode = Object.assign({}, newNode);
      delete (newNode as IParseTreeNode).end;
    }
    return newNode;
  }) as unknown as IParseTreeNode;
export const wikiAstDictWithoutPos = mapValues(wikiAstDict, (ast) =>
  Array.isArray(ast) ? ast.map((aAst) => mapToNoPosNode(aAst)) : mapToNoPosNode(ast),
) as typeof wikiAstDict;
