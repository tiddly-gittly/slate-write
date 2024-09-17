import { toPlatePlugin } from '@udecode/plate-common/react';
import { createSlatePlugin } from '@udecode/plate-core';

export const ELEMENT_ADVANCED_BLOCK = 'advanced_block';

export const createAdvancedBlockPlugin = toPlatePlugin(createSlatePlugin({
  key: ELEMENT_ADVANCED_BLOCK,
  node: {
    isElement: true,
    isVoid: false,
  },
  handlers: {},
}));
