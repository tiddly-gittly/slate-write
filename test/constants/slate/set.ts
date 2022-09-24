import { TEditor, Value, TElement, TText } from '@udecode/plate-core';

export const set: Record<string, TEditor<Value> | TElement | TText | Array<TEditor<Value> | TElement | TText>> = {
  setDefine: [
    {
      type: 'set',
      isElement: true,
      isVoid: true,
      children: [
        {
          type: 'macro',
          isElement: true,
          isVoid: true,
          children: [
            {
              text: '',
            },
          ],
          node: {
            type: 'macrocall',
            params: [{ type: 'macro-parameter', start: 62, value: 'Title/Prompt', end: 75 }],
            name: 'lingo',
            isBlock: true,
          },
        },
      ],
      node: {
        type: 'set',
        attributes: { name: { type: 'string', value: 'lingo-base' }, value: { type: 'string', value: '$:/language/ControlPanel/Basics/' } },
        params: [],
        isMacroDefinition: true,
      },
    },
  ],
};
