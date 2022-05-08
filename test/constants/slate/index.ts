import { TEditor, TElement, TText } from '@udecode/plate';

import { image } from './image';
import { ol } from './ol';
import { transclude } from './transclude';
import { widget } from './widget';
import { link } from './link';
import { heading } from './heading';

/**
 * Get value by adding `console.log(`newValue`, newValue);` in `onSave` of `src/components/editor.tsx`.
 *
 * Sometimes may need to add `as TElement` on nested `children: []` to prevent ts error.
 */
export const slateDict: Record<string, TEditor | TElement | TText | Array<TEditor | TElement | TText>> = {
  ...image,
  ...transclude,
  ...widget,
  ...link,
  ...heading,
  ...ol,
  text: [{ text: 'AAA' }],
  'p > text': { type: 'p', children: [{ text: 'AAA' }] },
};
