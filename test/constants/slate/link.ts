/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { TEditor, Value, TElement, TText } from '@udecode/plate-core';

export const link: Record<string, TEditor<Value> | TElement | TText | Array<TEditor<Value> | TElement | TText>> = {
  link: [
    {
      type: 'p',
      children: [
        {
          type: 'a',
          'tw-type': 'link',
          'tw-attributes': { to: { type: 'string', value: 'ExampleTag' } },
          url: 'ExampleTag',
          children: [{ text: 'ExampleTag' }],
        },
      ],
    },
  ],
  'empty link': [
    { type: 'p', children: [{ type: 'a', 'tw-type': 'link', 'tw-attributes': { to: { type: 'string', value: '' } }, url: '', children: [{ text: '' }] }] },
  ],
  'alias link': [
    {
      type: 'p',
      children: [
        { type: 'a', 'tw-type': 'link', 'tw-attributes': { to: { type: 'string', value: 'ExampleTag' } }, url: 'ExampleTag', children: [{ text: 'SomeText' }] },
      ],
    },
  ],
  'external link': [
    {
      type: 'p',
      children: [
        {
          type: 'a',
          children: [{ text: '' }],
          isBlock: false,
          'tw-attributes': { id: { name: 'id', type: 'string', value: '#Top_of_tiddler' } },
          orderedAttributes: [{ name: 'id', type: 'string', value: '#Top_of_tiddler' }],
        },
      ],
    },
    {
      type: 'p',
      children: [
        {
          type: 'a',
          children: [{ text: 'TW5' }],
          'tw-attributes': {
            class: { type: 'string', value: 'tc-tiddlylink-external' },
            href: { type: 'string', value: 'https://tiddlywiki.com' },
            target: { type: 'string', value: '_blank' },
            rel: { type: 'string', value: 'noopener noreferrer' },
          },
        },
      ],
    },
    {
      type: 'p',
      children: [
        {
          type: 'a',
          children: [{ text: 'Mail me' }],
          'tw-attributes': {
            class: { type: 'string', value: 'tc-tiddlylink-external' },
            href: { type: 'string', value: 'mailto:me@where.net' },
            target: { type: 'string', value: '_blank' },
            rel: { type: 'string', value: 'noopener noreferrer' },
          },
        },
      ],
    },
    {
      type: 'p',
      children: [
        {
          type: 'a',
          children: [{ text: 'Open file' }],
          'tw-attributes': {
            class: { type: 'string', value: 'tc-tiddlylink-external' },
            href: { type: 'string', value: '../README.md' },
            target: { type: 'string', value: '_blank' },
            rel: { type: 'string', value: 'noopener noreferrer' },
          },
        },
      ],
    },
    {
      type: 'p',
      children: [
        {
          type: 'a',
          isBlock: false,
          children: [{ text: 'Top' }],
          'tw-attributes': { href: { name: 'href', type: 'string', value: '##Top_of_tiddler' } },
          orderedAttributes: [{ name: 'href', type: 'string', value: '##Top_of_tiddler' }],
        },
      ],
    },
  ],
  'link in a list': [
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
                          text: '',
                        },
                        {
                          type: 'a',
                          url: 'BBB',
                          attributes: {
                            to: 'BBB',
                          },
                          'tw-attributes': {
                            to: {
                              type: 'string',
                              value: 'BBB',
                            },
                          },
                          children: [
                            {
                              text: 'BBB',
                            },
                          ],
                          'tw-type': 'link',
                        },
                        {
                          text: '',
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
  ],
};
