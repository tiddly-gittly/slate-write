/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { IParseTreeNode } from 'tiddlywiki';

export const transclude: Record<string, IParseTreeNode[] | IParseTreeNode> = {
  transclude: [
    {
      // the source tiddler
      type: 'tiddler',
      attributes: {
        tiddler: {
          type: 'string',
          value: 'favicon.ico',
        },
      },
      isBlock: true,
      children: [
        {
          // the transclude template part, same as the source tiddler if no template is used
          type: 'transclude',
          attributes: {
            tiddler: {
              type: 'string',
              value: 'favicon.ico',
            },
          },
          isBlock: true,
        },
      ],
    },
  ],
};
