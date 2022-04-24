/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { IParseTreeNode } from 'tiddlywiki';

export const image: Record<string, IParseTreeNode[] | IParseTreeNode> = {
  image: [
    {
      type: 'element',
      tag: 'p',
      children: [
        {
          type: 'image',
          attributes: {
            source: {
              type: 'string',
              value: 'TiddlyWikiIconBlack.png',
            },
          },
        },
      ],
      start: 0,
      end: 30,
    },
  ],
  'image with tooltip and width': [
    {
      type: 'element',
      tag: 'p',
      children: [
        {
          type: 'image',
          attributes: {
            width: {
              start: 5,
              name: 'width',
              type: 'string',
              value: '75%',
              end: 14,
            },
            tooltip: {
              type: 'string',
              value: 'black one',
            },
            source: {
              type: 'string',
              value: 'TiddlyWikiIconBlack.png',
            },
          },
        },
      ],
      start: 0,
      end: 51,
    },
  ],
};
