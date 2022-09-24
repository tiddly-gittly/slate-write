import { TEditor, Value, TElement, TText } from '@udecode/plate-core';

import { image } from './image';
import { ol } from './ol';
import { transclude } from './transclude';
import { codeblock } from './codeblock';
import { widget } from './widget';
import { link } from './link';
import { heading } from './heading';
import { macro } from './macro';
import { table } from './table';
import { set } from './set';

/**
 * Get value by adding `console.log(`newValue`, newValue);` in `onSave` of `src/components/editor.tsx`.
 *
 * Sometimes may need to add `as TElement` on nested `children: []` to prevent ts error.
 */
export const slateDict: Record<string, TEditor<Value> | TElement | TText | Array<TEditor<Value> | TElement | TText>> = {
  ...image,
  ...transclude,
  ...codeblock,
  ...widget,
  ...link,
  ...heading,
  ...ol,
  ...macro,
  ...table,
  ...set,
  text: [{ text: 'AAA' }],
  'p > text': { type: 'p', children: [{ text: 'AAA' }] },
};
