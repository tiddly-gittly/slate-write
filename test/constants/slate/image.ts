import { TEditor, TElement, TText } from '@udecode/plate';

export const image: Record<string, TEditor | TElement | TText | Array<TEditor | TElement | TText>> = {
  image: [
    {
      type: 'img',
      children: [
        {
          text: '',
        },
      ],
      url: 'https://source.unsplash.com/kFrdX5IeQzI',
      // width: '75%',
      caption: [
        {
          text: 'caption',
        },
      ],
    },
    {
      type: 'img',
      url: 'https://pic2.zhimg.com/80/v2-b25b5049706c797d69b3a7d43e514479_1440w.jpg',
      children: [
        {
          text: '',
        },
      ],
    },
  ],
};
