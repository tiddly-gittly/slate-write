/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createPlateUI } from '@udecode/plate-ui';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { withPlaceholders } from '@udecode/plate-ui-placeholder';

export const withStyledPlaceHolders = (components: any): ReturnType<typeof createPlateUI> =>
  withPlaceholders(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: 'Type / for commands',
      hideOnBlur: true,
    },
  ]);
