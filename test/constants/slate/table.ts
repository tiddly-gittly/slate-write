import { TEditor, Value, TElement, TText } from '@udecode/plate-core';

export const table: Record<string, TEditor<Value> | TElement | TText | Array<TEditor<Value> | TElement | TText>> = {
  table: [
    {
      type: 'table',
      children: [
        {
          type: 'tr',
          attributes: { class: 'evenRow' },
          'tw-attributes': { class: { name: 'class', type: 'string', value: 'evenRow' } },
          orderedAttributes: [
            {
              name: 'class',
              type: 'string',
              value: 'evenRow',
            },
          ],
          children: [
            {
              type: 'td',
              children: [
                {
                  type: 'p',
                  children: [
                    {
                      text: 'cell one',
                    },
                  ],
                },
              ],
            },
            {
              type: 'td',
              children: [
                {
                  type: 'p',
                  children: [
                    {
                      text: 'cell two',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tr',
          attributes: { class: 'oddRow' },
          'tw-attributes': { class: { name: 'class', type: 'string', value: 'oddRow' } },
          orderedAttributes: [
            {
              name: 'class',
              type: 'string',
              value: 'oddRow',
            },
          ],
          children: [
            {
              type: 'td',
              children: [
                {
                  type: 'p',
                  children: [
                    {
                      text: 'cell three',
                    },
                  ],
                },
              ],
            },
            {
              type: 'td',
              children: [
                {
                  type: 'p',
                  children: [
                    {
                      text: 'cell four',
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
