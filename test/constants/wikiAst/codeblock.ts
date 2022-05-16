/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { IParseTreeNode } from 'tiddlywiki';

export const codeblock: Record<string, IParseTreeNode[] | IParseTreeNode> = {
  codeblock: [
    {
      type: 'codeblock',
      attributes: {
        code: {
          type: 'string',
          value: '<$list filter="[tag[ExampleTag]sort[title]]"/>',
        },
        language: {
          type: 'string',
          value: 'tid',
        },
      },
    },
  ],
};
