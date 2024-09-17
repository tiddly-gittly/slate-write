import { toPlatePlugin } from '@udecode/plate-common/react';
import { createSlatePlugin } from '@udecode/plate-core';
import { onKeyDownCombobox } from './onKeyDownCombobox';

export const KEY_COMBOBOX = 'combobox';

export const reactComboBoxPlugin = toPlatePlugin(createSlatePlugin({
  key: KEY_COMBOBOX,
  handlers: {
    onKeyDown: onKeyDownCombobox,
  },
}));
