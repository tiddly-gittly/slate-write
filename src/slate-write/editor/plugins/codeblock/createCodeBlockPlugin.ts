import { createPluginFactory } from '@udecode/plate-core';
import { ELEMENT_CODE_BLOCK } from './constants';
import { CodeBlockPlugin } from './types';

/**
 * Enables support for pre-formatted code blocks.
 */
export const createCodeBlockPlugin = createPluginFactory<CodeBlockPlugin>({
  key: ELEMENT_CODE_BLOCK,
  isElement: true,
  isVoid: true,
  handlers: {
    // onKeyDown: onKeyDownCodeBlock,
  },
  options: {
    // hotkey: ['mod+opt+8', 'mod+shift+8'],
    syntaxPopularFirst: true,
    showSyntaxSwitcher: true,
  },
});
