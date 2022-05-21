import { createPluginFactory } from '@udecode/plate-core';
import { onKeyDownCombobox } from './onKeyDownCombobox';

export const KEY_COMBOBOX = 'combobox';

export const createComboBoxPlugin = createPluginFactory({
  key: KEY_COMBOBOX,
  handlers: {
    onKeyDown: onKeyDownCombobox,
  },
});
