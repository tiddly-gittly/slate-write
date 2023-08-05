/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { PlatePluginComponent } from '@udecode/plate-core';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { withPlaceholders } from '@udecode/plate-ui-placeholder';
import { DefaultPlatePluginKey } from './DefaultPlatePluginKey';

export const withStyledPlaceHolders = (components: any): Record<DefaultPlatePluginKey, PlatePluginComponent<any>> =>
  withPlaceholders(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: 'Type / for commands',
      hideOnBlur: true,
    },
  ]);
