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
};
ol['ol > li > text'] = cloneDeep(ol['ul > li > text']);
(ol['ol > li > text'] as IDomParseTreeNode[])[0].tag = 'ol';
