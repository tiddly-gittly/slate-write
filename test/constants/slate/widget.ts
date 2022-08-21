import { TEditor, Value, TElement, TText } from '@udecode/plate-core';

export const widget: Record<string, TEditor<Value> | TElement | TText | Array<TEditor<Value> | TElement | TText>> = {
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
  rpn: [
    {
      type: 'p',
      children: [
        {
          node: {
            type: 'macrocall',
            attributes: {
              $name: {
                name: '$name',
                type: 'string',
                value: 'rpn',
              },
              a: {
                name: 'a',
                type: 'macro',
                value: {
                  type: 'macrocall',
                  params: [
                    {
                      type: 'macro-parameter',
                      value: '2',
                    },
                    {
                      type: 'macro-parameter',
                      value: '2',
                    },
                    {
                      type: 'macro-parameter',
                      value: '*',
                    },
                  ],
                  name: 'rpn',
                },
              },
              b: {
                name: 'b',
                type: 'string',
                value: 'pi',
              },
              operation: {
                name: 'operation',
                type: 'string',
                value: '*',
              },
              decimals: {
                name: 'decimals',
                type: 'string',
                value: '4',
              },
            },
            orderedAttributes: [
              {
                name: '$name',
                type: 'string',
                value: 'rpn',
              },
              {
                name: 'a',
                type: 'macro',
                value: {
                  type: 'macrocall',
                  params: [
                    {
                      type: 'macro-parameter',
                      value: '2',
                    },
                    {
                      type: 'macro-parameter',
                      value: '2',
                    },
                    {
                      type: 'macro-parameter',
                      value: '*',
                    },
                  ],
                  name: 'rpn',
                },
              },
              {
                name: 'b',
                type: 'string',
                value: 'pi',
              },
              {
                name: 'operation',
                type: 'string',
                value: '*',
              },
              {
                name: 'decimals',
                type: 'string',
                value: '4',
              },
            ],
            tag: '$macrocall',
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
  ],
};
