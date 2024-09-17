import { toPlatePlugin } from '@udecode/plate-common/react'; 
import { createSlatePlugin } from '@udecode/plate-core';
import { ELEMENT_CODE_BLOCK } from './constants';

/**
 * Enables support for pre-formatted code blocks.
 */
export const createCodeBlockPlugin = toPlatePlugin(createSlatePlugin({
  key: ELEMENT_CODE_BLOCK,
  node: {
    isElement: true,
    isVoid: true,
  },
  handlers: {
    // onKeyDown: onKeyDownCodeBlock,
  },
  options: {
    // hotkey: ['mod+opt+8', 'mod+shift+8'],
    syntaxPopularFirst: true,
    showSyntaxSwitcher: true,
  },
}));
