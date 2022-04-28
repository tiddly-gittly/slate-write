import { TEditor, TElement, TText } from '@udecode/plate';

export const widget: Record<string, TEditor | TElement | TText | Array<TEditor | TElement | TText>> = {
  'list widget': {
    type: 'p',
    children: [
      {
        node: {
          type: 'list',
          attributes: {
            filter: {
              name: 'filter',
              type: 'string',
              value: '[tag[ExampleTag]sort[title]]',
            },
          },
          orderedAttributes: [
            {
              name: 'filter',
              type: 'string',
              value: '[tag[ExampleTag]sort[title]]',
            },
          ],
          tag: '$list',
          isSelfClosing: true,
          isBlock: false,
        },
        type: 'widget',
        isElement: true,
        isVoid: true,
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  'list widget block': [
    {
      node: {
        type: 'list',
        start: 0,
        attributes: {
          filter: {
            start: 6,
            name: 'filter',
            type: 'string',
            value: '[tag[ExampleTag]sort[title]]',
            end: 44,
          },
        },
        orderedAttributes: [
          {
            start: 6,
            name: 'filter',
            type: 'string',
            value: '[tag[ExampleTag]sort[title]]',
            end: 44,
          },
        ],
        tag: '$list',
        isSelfClosing: true,
        end: 46,
        isBlock: true,
      },
      type: 'widget',
      isElement: true,
      isVoid: true,
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'p',
      children: [
        {
          text: 'aaa',
        },
      ],
    },
  ],
};