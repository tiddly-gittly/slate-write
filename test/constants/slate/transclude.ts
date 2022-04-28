import { TEditor, TElement, TText } from '@udecode/plate';

export const transclude: Record<string, TEditor | TElement | TText | Array<TEditor | TElement | TText>> = {
  transclude: {
    node: {
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
    type: 'widget',
    isElement: true,
    isVoid: true,
    children: [
      {
        text: '',
      },
    ],
  },
};
