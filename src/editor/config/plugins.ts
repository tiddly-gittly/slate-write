import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import { createBlockquotePlugin } from '@udecode/plate-block-quote';
import {
  createBoldPlugin,
  createCodePlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
  createItalicPlugin,
} from '@udecode/plate-basic-marks';
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { createSoftBreakPlugin, createExitBreakPlugin } from '@udecode/plate-break';
import { createHorizontalRulePlugin } from '@udecode/plate-horizontal-rule';
import { createIndentListPlugin } from '@udecode/plate-indent-list';
import { createIndentPlugin } from '@udecode/plate-indent';
import { createKbdPlugin } from '@udecode/plate-kbd';
import { createLinkPlugin } from '@udecode/plate-link';
import { createListPlugin } from '@udecode/plate-list';
import { createParagraphPlugin } from '@udecode/plate-paragraph';
import { createPlugins, createInlineVoidPlugin } from '@udecode/plate-core';
import { createSelectOnBackspacePlugin } from '@udecode/plate-select';

import { CONFIG } from './config';
import { createHeadingPlugin } from '../plugins/heading';
import { createCodeBlockPlugin } from '../plugins/codeblock';
import { createWidgetPlugin } from '../plugins/widget';
import { createDndPlugin } from '../plugins/dnd';
import { createMacroPlugin } from '../plugins/macro';
import { createAutoCompletePlugin } from '../plugins/autoComplete';
import { createComboBoxPlugin } from '../plugins/comboBox';

export const basicElements = createPlugins([
  createBlockquotePlugin(),
  createCodeBlockPlugin(),
  createHeadingPlugin(),
  createParagraphPlugin(),
  createHorizontalRulePlugin(),
  createListPlugin(),
  createLinkPlugin(),
]);

export const basicMarks = createPlugins([
  createBoldPlugin(),
  createCodePlugin(),
  createItalicPlugin(),
  createStrikethroughPlugin(),
  createSubscriptPlugin(),
  createSuperscriptPlugin(),
  createUnderlinePlugin(),
]);
export const utils = createPlugins([
  createComboBoxPlugin(),
  createAutoCompletePlugin(CONFIG.snippetComboBox),
  createAutoCompletePlugin(CONFIG.wikiLinkComboBox),
  createAutoCompletePlugin(CONFIG.wikiTransclusionComboBox),
  createAutoCompletePlugin(CONFIG.macrosComboBox),
  createAutoCompletePlugin(CONFIG.widgetComboBox),
  createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
  createSoftBreakPlugin(CONFIG.softBreak),
  createExitBreakPlugin(CONFIG.exitBreak),
  createAutoformatPlugin(CONFIG.autoformat),
  createDndPlugin(),
  createIndentListPlugin(),
  createIndentPlugin(),
  createKbdPlugin(),
  createInlineVoidPlugin(),
  /**
   * Add a trailing block when the last node type is not `type` and when the editor has .
   */
  createTrailingBlockPlugin(),
]);
export const twAdvancedElements = createPlugins([createWidgetPlugin(), createMacroPlugin()]);
