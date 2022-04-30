/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createPlateUI, ELEMENT_PARAGRAPH, withPlaceholders } from '@udecode/plate';

export const withStyledPlaceHolders = (components: any): ReturnType<typeof createPlateUI> =>
  withPlaceholders(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: 'Type a paragraph',
      hideOnBlur: true,
    },
  ]);
