import { TEditor, TElement, TText } from '@udecode/plate';
import cloneDeep from 'lodash/cloneDeep';

import { image } from './image';
import { transclude } from './transclude';
import { widget } from './widget';

/**
 * Get value by adding `console.log(`newValue`, newValue);` in `onSave` of `src/components/editor.tsx`.
 *
 * Sometimes may need to add `as TElement` on nested `children: []` to prevent ts error.
 */
export const slateDict: Record<string, TEditor | TElement | TText | Array<TEditor | TElement | TText>> = {
  ...image,
  ...transclude,
  ...widget,
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
  'p + ol + blockquote > div + ol': [
    {
      type: 'p',
      children: [
        {
          text: 'PPP',
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
                  text: 'AAA',
                },
              ],
            } as TElement,
          ],
        },
      ],
    },
    {
      type: 'blockquote',
      children: [
        {
          text: 'BBB\nBBB2',
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
  'p basic sequence marks': [
    {
      type: 'p',
      children: [
        {
          text: 'A',
        },
        {
          bold: true,
          text: 'A',
        },
        {
          bold: true,
          text: 'A',
          italic: true,
        },
        {
          bold: true,
          text: 'A',
        },
        {
          text: 'A',
        },
      ],
    },
    {
      type: 'p',
      children: [
        {
          text: 'B',
        },
        {
          italic: true,
          text: 'B',
        },
        {
          italic: true,
          text: 'B',
          underline: true,
        },
        {
          italic: true,
          text: 'B',
        },
        {
          text: 'B',
        },
      ],
    },
    {
      type: 'p',
      children: [
        {
          text: 'C',
        },
        {
          underline: true,
          text: 'C',
        },
        {
          underline: true,
          text: 'C',
          strikethrough: true,
        },
        {
          underline: true,
          text: 'C',
        },
        {
          text: 'C',
        },
      ],
    },
    {
      type: 'p',
      children: [
        {
          text: 'D',
        },
        {
          strikethrough: true,
          text: 'D',
        },
        {
          strikethrough: true,
          text: 'D',
          code: true,
        },
        {
          strikethrough: true,
          text: 'D',
        },
        {
          text: 'D',
        },
      ],
    },
    {
      type: 'p',
      children: [
        {
          text: 'E',
        },
        {
          code: true,
          text: 'EEE',
        },
        {
          text: 'E',
        },
      ],
    },
    {
      type: 'p',
      children: [
        {
          text: 'F',
        },
        {
          text: 'F',
          superscript: true,
        },
        {
          text: 'F',
          subscript: true,
        },
        {
          superscript: true,
          text: 'F',
        },
        {
          text: 'F',
        },
      ],
    },
    {
      type: 'p',
      children: [
        {
          text: 'G',
        },
        {
          text: 'G',
          subscript: true,
        },
        {
          subscript: true,
          text: 'G',
          bold: true,
        },
        {
          subscript: true,
          text: 'G',
        },
        {
          text: 'G',
        },
      ],
    },
  ],
  'ol > li > mark > text': [
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
                  text: 'A',
                },
                {
                  text: 'A',
                  italic: true,
                  bold: true,
                },
                {
                  text: 'A',
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
                          text: 'B',
                        },
                        {
                          text: 'B',
                          italic: true,
                        },
                        {
                          text: 'B',
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
                                  text: 'C',
                                },
                                {
                                  text: 'C',
                                  superscript: true,
                                },
                                {
                                  text: 'C',
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
    } as TElement,
  ],
};
slateDict['ol > li > text'] = cloneDeep(slateDict['ul > li > text']);
(slateDict['ol > li > text'] as TElement).type = 'ol';
