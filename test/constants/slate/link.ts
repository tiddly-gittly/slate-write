import { TEditor, TElement, TText } from '@udecode/plate';

export const link: Record<string, TEditor | TElement | TText | Array<TEditor | TElement | TText>> = {
  link: [
    {
      type: 'p',
      children: [
        { type: 'a', 'tw-type': 'link', attributes: { to: { type: 'string', value: 'ExampleTag' } }, url: 'ExampleTag', children: [{ text: 'ExampleTag' }] },
      ],
    },
  ],
  'empty link': [
    { type: 'p', children: [{ type: 'a', 'tw-type': 'link', attributes: { to: { type: 'string', value: '' } }, url: '', children: [{ text: '' }] }] },
  ],
  'alias link': [
    {
      type: 'p',
      children: [
        { type: 'a', 'tw-type': 'link', attributes: { to: { type: 'string', value: 'ExampleTag' } }, url: 'ExampleTag', children: [{ text: 'SomeText' }] },
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
          attributes: { id: { name: 'id', type: 'string', value: '#Top_of_tiddler' } },
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
          attributes: {
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
          attributes: {
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
          attributes: {
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
          attributes: { href: { name: 'href', type: 'string', value: '##Top_of_tiddler' } },
          orderedAttributes: [{ name: 'href', type: 'string', value: '##Top_of_tiddler' }],
        },
      ],
    },
  ],
};
