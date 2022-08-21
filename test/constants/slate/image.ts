import { TEditor, Value, TElement, TText } from '@udecode/plate-core';

export const image: Record<string, TEditor<Value> | TElement | TText | Array<TEditor<Value> | TElement | TText>> = {
  image: {
    type: 'p',
    children: [
      {
        node: {
          type: 'image',
          attributes: {
            source: {
              type: 'string',
              value: 'TiddlyWikiIconBlack.png',
            },
          },
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
};
