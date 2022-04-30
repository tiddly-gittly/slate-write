/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { IParseTreeNode } from 'tiddlywiki';

export const link: Record<string, IParseTreeNode[] | IParseTreeNode> = {
  link: [
    {
      type: 'element',
      tag: 'p',
      children: [
        {
          type: 'link',
          attributes: {
            to: {
              type: 'string',
              value: 'ExampleTag',
            },
          },
          children: [
            {
              type: 'text',
              text: 'ExampleTag',
            },
          ],
        } as IParseTreeNode,
      ],
      start: 0,
      end: 14,
    },
  ],
  'empty link': [
    {
      type: 'element',
      tag: 'p',
      children: [
        {
          type: 'link',
          attributes: {
            to: {
              type: 'string',
              value: '',
            },
          },
          children: [
            {
              type: 'text',
              text: '',
            },
          ],
        } as IParseTreeNode,
      ],
      start: 0,
      end: 4,
    },
  ],
  'alias link': [
    {
      type: 'element',
      tag: 'p',
      children: [
        {
          type: 'link',
          attributes: {
            to: {
              type: 'string',
              value: 'ExampleTag',
            },
          },
          children: [
            {
              type: 'text',
              text: 'SomeText',
            },
          ],
        } as IParseTreeNode,
      ],
      start: 0,
      end: 23,
    },
  ],
  'external link': [
    {
      type: 'element',
      tag: 'p',
      children: [
        {
          type: 'element',
          start: 0,
          attributes: {
            id: {
              start: 2,
              name: 'id',
              type: 'string',
              value: '#Top_of_tiddler',
              end: 23,
            },
          },
          orderedAttributes: [
            {
              start: 2,
              name: 'id',
              type: 'string',
              value: '#Top_of_tiddler',
              end: 23,
            },
          ],
          tag: 'a',
          end: 24,
          isBlock: false,
          children: [],
        },
      ],
      start: 0,
      end: 28,
    },
    {
      type: 'element',
      tag: 'p',
      children: [
        {
          type: 'element',
          tag: 'a',
          start: 30,
          attributes: {
            class: {
              type: 'string',
              value: 'tc-tiddlylink-external',
            },
            href: {
              type: 'string',
              value: 'https://tiddlywiki.com',
            },
            target: {
              type: 'string',
              value: '_blank',
            },
            rel: {
              type: 'string',
              value: 'noopener noreferrer',
            },
          },
          children: [
            {
              type: 'text',
              text: 'TW5',
            },
          ],
          end: 63,
        },
      ],
      start: 30,
      end: 63,
    },
    {
      type: 'element',
      tag: 'p',
      children: [
        {
          type: 'element',
          tag: 'a',
          start: 65,
          attributes: {
            class: {
              type: 'string',
              value: 'tc-tiddlylink-external',
            },
            href: {
              type: 'string',
              value: 'mailto:me@where.net',
            },
            target: {
              type: 'string',
              value: '_blank',
            },
            rel: {
              type: 'string',
              value: 'noopener noreferrer',
            },
          },
          children: [
            {
              type: 'text',
              text: 'Mail me',
            },
          ],
          end: 99,
        },
      ],
      start: 65,
      end: 99,
    },
    {
      type: 'element',
      tag: 'p',
      children: [
        {
          type: 'element',
          tag: 'a',
          start: 101,
          attributes: {
            class: {
              type: 'string',
              value: 'tc-tiddlylink-external',
            },
            href: {
              type: 'string',
              value: '../README.md',
            },
            target: {
              type: 'string',
              value: '_blank',
            },
            rel: {
              type: 'string',
              value: 'noopener noreferrer',
            },
          },
          children: [
            {
              type: 'text',
              text: 'Open file',
            },
          ],
          end: 130,
        },
      ],
      start: 101,
      end: 130,
    },
    {
      type: 'element',
      tag: 'p',
      children: [
        {
          type: 'element',
          start: 132,
          attributes: {
            href: {
              start: 134,
              name: 'href',
              type: 'string',
              value: '##Top_of_tiddler',
              end: 158,
            },
          },
          orderedAttributes: [
            {
              start: 134,
              name: 'href',
              type: 'string',
              value: '##Top_of_tiddler',
              end: 158,
            },
          ],
          tag: 'a',
          end: 159,
          isBlock: false,
          children: [
            {
              type: 'text',
              text: 'Top',
              start: 159,
              end: 162,
            },
          ],
        },
      ],
      start: 132,
      end: 166,
    },
  ],
  'link in a list': [
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
                      type: 'link',
                      attributes: {
                        to: {
                          type: 'string',
                          value: 'BBB',
                        },
                      },
                      children: [
                        {
                          type: 'text',
                          text: 'BBB',
                        },
                      ],
                    } as IParseTreeNode,
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
                              start: 21,
                              end: 24,
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
