/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { IParseTreeNode } from 'tiddlywiki';

export const macro: Record<string, IParseTreeNode[] | IParseTreeNode> = {
  'macro alert': [
    {
      type: 'macrocall',
      start: 0,
      params: [
        {
          type: 'macro-parameter',
          start: 7,
          value: 'primary',
          end: 15,
        },
        {
          type: 'macro-parameter',
          start: 15,
          value: 'primary alert',
          end: 31,
        },
        {
          type: 'macro-parameter',
          start: 31,
          value: '60%',
          name: 'width',
          end: 41,
        },
      ],
      name: 'alert',
      end: 43,
      isBlock: true,
    },
  ],
};
