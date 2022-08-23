import { TEditor, Value, TElement, TText } from '@udecode/plate-core';

export const table: Record<string, TEditor<Value> | TElement | TText | Array<TEditor<Value> | TElement | TText>> = {
  table: {
    type: 'table',
    children: [
      {
        type: 'tr',
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
};
