/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable @typescript-eslint/ban-types */
import { AutoformatPlugin } from '@udecode/plate-autoformat';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_TD } from '@udecode/plate-table';
import { ELEMENT_TODO_LI } from '@udecode/plate-list';
import { ExitBreakPlugin, SoftBreakPlugin } from '@udecode/plate-break';
import { IndentPlugin } from '@udecode/plate-indent';
import { isBlockAboveEmpty, isSelectionAtBlockStart, PlatePlugin } from '@udecode/plate-core';
import { LinkPlugin } from '@udecode/plate-link';
import { NormalizeTypesPlugin } from '@udecode/plate-normalizers';
import { ResetNodePlugin } from '@udecode/plate-reset-node';
import { SelectOnBackspacePlugin } from '@udecode/plate-select';
import type { TComboboxItemBase } from '@udecode/plate-combobox';
import { TrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { KEYS_HEADING, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_CODE_BLOCK } from '../plugins/codeblock/constants';
import type { EditableProps } from 'slate-react/dist/components/editable';
import { autoformatRules } from './autoformat';
import { ELEMENT_WIDGET } from '../plugins/widget';
import { AutoCompletePlugin } from '../plugins/autoComplete';

export const SAVE_DEBOUNCE_INTERVAL = 1000;

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  defaultType: ELEMENT_PARAGRAPH,
};

interface Config {
  align: Partial<PlatePlugin>;
  autoformat: Partial<PlatePlugin<AutoformatPlugin>>;
  editableProps: EditableProps;
  exitBreak: Partial<PlatePlugin<ExitBreakPlugin>>;
  forceLayout: Partial<PlatePlugin<NormalizeTypesPlugin>>;
  indent: Partial<PlatePlugin<IndentPlugin>>;
  lineHeight: Partial<PlatePlugin>;
  link: Partial<PlatePlugin<LinkPlugin>>;
  resetBlockType: Partial<PlatePlugin<ResetNodePlugin>>;
  selectOnBackspace: Partial<PlatePlugin<SelectOnBackspacePlugin>>;
  snippetComboBox: Partial<PlatePlugin<AutoCompletePlugin<undefined>>>;
  wikiLinkComboBox: Partial<PlatePlugin<AutoCompletePlugin<undefined>>>;
  wikiTransclusionComboBox: Partial<PlatePlugin<AutoCompletePlugin<undefined>>>;
  macrosComboBox: Partial<PlatePlugin<AutoCompletePlugin<undefined>>>;
  widgetComboBox: Partial<PlatePlugin<AutoCompletePlugin<undefined>>>;
  softBreak: Partial<PlatePlugin<SoftBreakPlugin>>;
  trailingBlock: Partial<PlatePlugin<TrailingBlockPlugin>>;
}

// TODO: load keyboard shortcuts from tw config
export const CONFIG: Config = {
  link: {
    options: {
      hotkey: 'ctrl+l',
    },
  },
  snippetComboBox: {
    key: '/',
  },
  wikiLinkComboBox: {
    key: '[[',
    options: {
      needSpaceBeforeTrigger: false,
      keepTrigger: true,
      textToInsertAfter: ']]',
      createAutoCompleteNode: (item: TComboboxItemBase) => {
        return { text: item.text as string };
      },
    },
  },
  wikiTransclusionComboBox: {
    key: '{{',
    options: {
      needSpaceBeforeTrigger: false,
      keepTrigger: true,
      textToInsertAfter: '}}',
      createAutoCompleteNode: (item: TComboboxItemBase) => {
        return { text: item.text as string };
      },
    },
  },
  macrosComboBox: {
    key: '<<',
    options: {
      needSpaceBeforeTrigger: false,
      createAutoCompleteNode: (item: TComboboxItemBase) => {
        return { text: item.text as string };
      },
    },
  },
  widgetComboBox: {
    key: '<$',
    options: {
      needSpaceBeforeTrigger: false,
      createAutoCompleteNode: (item: TComboboxItemBase) => {
        return { text: item.text as string };
      },
    },
  },
  editableProps: {
    // we need this to reset cursor selection on every remount of widget, otherwise there will be IME problem, don't know why... https://github.com/tiddly-gittly/slate-write/issues/3#issuecomment-1114274656
    autoFocus: true,
    spellCheck: false,
    placeholder: 'Type / for commands, or write down what is in your mind',
  },

  align: {
    inject: {
      props: {
        validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6],
      },
    },
  },
  indent: {
    inject: {
      props: {
        validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK],
      },
    },
  },
  lineHeight: {
    inject: {
      props: {
        defaultNodeValue: 'normal',
        validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6],
      },
    },
  },
  resetBlockType: {
    options: {
      rules: [
        {
          ...resetBlockTypesCommonRule,
          hotkey: 'Enter',
          predicate: isBlockAboveEmpty,
        },
        {
          ...resetBlockTypesCommonRule,
          hotkey: 'Backspace',
          predicate: isSelectionAtBlockStart,
        },
      ],
    },
  },
  trailingBlock: { type: ELEMENT_PARAGRAPH },
  softBreak: {
    options: {
      rules: [
        { hotkey: 'shift+enter' },
        {
          hotkey: 'enter',
          query: {
            allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
          },
        },
      ],
    },
  },
  exitBreak: {
    options: {
      rules: [
        {
          hotkey: 'mod+enter',
        },
        {
          hotkey: 'mod+shift+enter',
          before: true,
        },
        {
          hotkey: 'enter',
          query: {
            start: true,
            end: true,
            allow: KEYS_HEADING,
          },
        },
      ],
    },
  },
  selectOnBackspace: {
    options: {
      query: {
        allow: [ELEMENT_WIDGET],
      },
    },
  },
  autoformat: {
    options: {
      rules: autoformatRules,
    },
  },
  forceLayout: {
    options: {
      rules: [{ path: [0], strictType: ELEMENT_H1 }],
    },
  },
};
