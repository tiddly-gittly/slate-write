/* eslint-disable unicorn/no-thenable */
/**
 * Files copied from plate's `packages/nodes/mention` to support `[[` two char trigger
 */
import type { TComboboxItemBase } from '@udecode/plate-combobox';
import { toPlatePlugin } from '@udecode/plate-common/react'; 
import { createSlatePlugin } from '@udecode/plate-core';
import { isSelectionInMentionInput, mentionOnKeyDownHandler } from '@udecode/plate-mention';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { AutoCompletePlugin } from './types';
import { withAutoComplete } from './withAutoComplete';

export const ELEMENT_AUTO_COMPLETE = 'auto_complete';
export const ELEMENT_AUTO_COMPLETE_INPUT = 'auto_complete_input';

/**
 * Enables support for auto-completing `/` and `[[`
 */
export const reactAutoCompletePlugin = toPlatePlugin(createSlatePlugin<AutoCompletePlugin>({
  key: ELEMENT_AUTO_COMPLETE,
  node: {
    isElement: true,
    isInline: true,
    isVoid: true,
  },
  handlers: {
    onKeyDown: mentionOnKeyDownHandler({ query: isSelectionInMentionInput }),
  },
  withOverrides: withAutoComplete,
  options: {
    needSpaceBeforeTrigger: true,
    createAutoCompleteNode: (item: TComboboxItemBase) => {
      return {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: item.text as string }],
      };
    },
  },
  plugins: [
    {
      key: ELEMENT_AUTO_COMPLETE_INPUT,
      node: {
        isElement: true,
        isInline: true,
      },
    },
  ],
  then: (editor: any, { key, options: { trigger } }: { key: any; options: { trigger: any } }) => ({
    options: {
      id: key,
      trigger: trigger ?? key,
    },
  }),
}));
