import { TEditor, Value, TElement, TText } from '@udecode/plate-core';

export const macro: Record<string, TEditor<Value> | TElement | TText | Array<TEditor<Value> | TElement | TText>> = {
  'macro alert': [
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
        params: [
          {
            type: 'macro-parameter',
            value: 'primary',
          },
          {
            type: 'macro-parameter',
            value: 'primary alert',
          },
          {
            type: 'macro-parameter',
            value: '60%',
            name: 'width',
          },
        ],
        name: 'alert',
        isBlock: true,
      },
    },
  ],
};
