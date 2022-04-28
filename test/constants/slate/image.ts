import { TEditor, TElement, TText } from '@udecode/plate';

export const image: Record<string, TEditor | TElement | TText | Array<TEditor | TElement | TText>> = {
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
