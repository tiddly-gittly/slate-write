/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { IDomParseTreeNode, IParseTreeNode } from 'tiddlywiki';
import cloneDeep from 'lodash/cloneDeep';

/**
 * Need to use `type: 'text' as const,`.
 */
export const ol: Record<string, IParseTreeNode[] | IParseTreeNode> = {
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
  'p + ol + blockquote > div + ol': [
    {
      type: 'element',
      tag: 'p',
      children: [
        {
          type: 'text' as const,
          text: 'PPP',
          start: 0,
          end: 3,
        },
      ],
      start: 0,
      end: 3,
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
              text: 'AAA',
              start: 7,
              end: 10,
            },
          ],
        },
      ],
    },
    {
      type: 'element',
      tag: 'blockquote',
      children: [
        {
          type: 'element',
          tag: 'div',
          children: [
            {
              type: 'text' as const,
              text: 'BBB',
              start: 14,
              end: 17,
            },
          ],
        },
        {
          type: 'element',
          tag: 'div',
          children: [
            {
              type: 'text' as const,
              text: 'BBB2',
              start: 20,
              end: 24,
            },
          ],
        },
      ],
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
              start: 28,
              end: 31,
            },
          ],
        },
      ],
    },
  ],
  'p + ol + blockquote > p + ol': [
    {
      type: 'element',
      tag: 'p',
      children: [
        {
          type: 'text' as const,
          text: 'PPP',
          start: 0,
          end: 3,
        },
      ],
      start: 0,
      end: 3,
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
              text: 'AAA',
              start: 7,
              end: 10,
            },
          ],
        },
      ],
    },
    {
      type: 'element',
      tag: 'blockquote',
      attributes: {
        class: {
          type: 'string',
          value: 'tc-quote',
        },
      },
      children: [
        {
          type: 'element',
          tag: 'p',
          children: [
            {
              type: 'text' as const,
              text: 'BBB',
              start: 15,
              end: 18,
            },
          ],
          start: 15,
          end: 18,
        },
        {
          type: 'element',
          tag: 'p',
          children: [
            {
              type: 'text' as const,
              text: 'BBB2\n',
              start: 20,
              end: 25,
            },
          ],
          start: 20,
          end: 25,
        },
      ],
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
              start: 31,
              end: 34,
            },
          ],
        },
      ],
    },
  ],
  'ol > li > mark > text': [
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
              text: 'A',
              start: 2,
              end: 3,
            },
            {
              type: 'element',
              tag: 'strong',
              children: [
                {
                  type: 'element',
                  tag: 'em',
                  children: [
                    {
                      type: 'text' as const,
                      text: 'A',
                      start: 7,
                      end: 8,
                    },
                  ],
                },
              ],
            },
            {
              type: 'text' as const,
              text: 'A',
              start: 12,
              end: 13,
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
                      text: 'B',
                      start: 17,
                      end: 18,
                    },
                    {
                      type: 'element',
                      tag: 'em',
                      children: [
                        {
                          type: 'text' as const,
                          text: 'B',
                          start: 20,
                          end: 21,
                        },
                      ],
                    },
                    {
                      type: 'text' as const,
                      text: 'B',
                      start: 23,
                      end: 24,
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
                              text: 'C',
                              start: 29,
                              end: 30,
                            },
                            {
                              type: 'element',
                              tag: 'sup',
                              children: [
                                {
                                  type: 'text' as const,
                                  text: 'C',
                                  start: 32,
                                  end: 33,
                                },
                              ],
                            },
                            {
                              type: 'text' as const,
                              text: 'C',
                              start: 35,
                              end: 36,
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
  'ol > ol > p + empty p': [
    {
      type: 'element',
      tag: 'ol',
      children: [
        {
          type: 'element',
          tag: 'li',
          children: [
            {
              type: 'text',
              text: '逐字输入',
              start: 2,
              end: 6,
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
                      type: 'text',
                      text: '先通过 ',
                      start: 10,
                      end: 14,
                    },
                    {
                      type: 'element',
                      tag: 'code',
                      children: [
                        {
                          type: 'text',
                          text: '/',
                        },
                      ],
                    },
                    {
                      type: 'text',
                      text: ' 菜单将当前块转换为特殊块，其实就是告诉编辑器进入实时预览模式',
                      start: 17,
                      end: 48,
                    },
                  ],
                },
                {
                  type: 'element',
                  tag: 'li',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  'ol + ol > ol > p': [
    {
      type: 'element',
      tag: 'ol',
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
            {
              type: 'element',
              tag: 'ol',
              children: [
                {
                  type: 'element',
                  tag: 'li',
                  children: [
                    {
                      type: 'text',
                      text: 'CCC',
                      start: 9,
                      end: 12,
                    },
                  ],
                },
                {
                  type: 'element',
                  tag: 'li',
                  children: [
                    {
                      type: 'text',
                      text: 'DDD',
                      start: 16,
                      end: 19,
                    },
                  ],
                },
                {
                  type: 'element',
                  tag: 'li',
                  children: [
                    {
                      type: 'text',
                      text: 'EEE',
                      start: 23,
                      end: 26,
                    },
                  ],
                },
              ],
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
              start: 29,
              end: 32,
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
                      type: 'text',
                      text: 'FF ',
                      start: 36,
                      end: 39,
                    },
                    {
                      type: 'element',
                      tag: 'code',
                      children: [
                        {
                          type: 'text',
                          text: '/',
                        },
                      ],
                    },
                    {
                      type: 'text',
                      text: ' FFF',
                      start: 42,
                      end: 46,
                    },
                  ],
                },
                {
                  type: 'element',
                  tag: 'li',
                  children: [
                    {
                      type: 'text',
                      text: 'FFF',
                      start: 50,
                      end: 53,
                    },
                  ],
                },
                {
                  type: 'element',
                  tag: 'li',
                  children: [
                    {
                      type: 'text',
                      text: 'GGG',
                      start: 57,
                      end: 60,
                    },
                  ],
                },
                {
                  type: 'element',
                  tag: 'li',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
ol['ol > li > text'] = cloneDeep(ol['ul > li > text']);
(ol['ol > li > text'] as IDomParseTreeNode[])[0].tag = 'ol';
