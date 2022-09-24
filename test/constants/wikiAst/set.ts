/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { IParseTreeNode } from 'tiddlywiki';

export const set: Record<string, IParseTreeNode[] | IParseTreeNode> = {
  setDefine: [
    {
      type: 'set',
      attributes: { name: { type: 'string', value: 'lingo-base' }, value: { type: 'string', value: '$:/language/ControlPanel/Basics/' } },
      children: [
        {
          type: 'macrocall',
          start: 55,
          params: [{ type: 'macro-parameter', start: 62, value: 'Title/Prompt', end: 75 }],
          name: 'lingo',
          end: 77,
          isBlock: true,
        },
      ],
      params: [],
      isMacroDefinition: true,
    },
  ],
};
