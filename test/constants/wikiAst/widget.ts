/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { IParseTreeNode } from 'tiddlywiki';

export const widget: Record<string, IParseTreeNode[] | IParseTreeNode> = {
  'list widget': [
    {
      type: 'element',
      tag: 'p',
      children: [
        {
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
          isBlock: false,
        } as IParseTreeNode,
      ],
      start: 0,
      end: 46,
    },
  ],
  'list widget block': [
    {
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
    } as IParseTreeNode,
    {
      type: 'element',
      tag: 'p',
      children: [
        {
          type: 'text',
          text: 'aaa',
          start: 48,
          end: 51,
        },
      ],
      start: 48,
      end: 51,
    },
  ],
};
