import { toPlatePlugin } from '@udecode/plate-common/react';
import { createSlatePlugin } from '@udecode/plate-core';

export const ELEMENT_WIDGET = 'widget';

export const reactWidgetPlugin = toPlatePlugin(createSlatePlugin({
  key: ELEMENT_WIDGET,
  node: {
    isElement: true,
    isVoid: true,
  },
}));
 