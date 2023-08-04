import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import {
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
} from '@udecode/plate-basic-marks';
import { createBlockquotePlugin } from '@udecode/plate-block-quote';
import { createExitBreakPlugin, createSoftBreakPlugin } from '@udecode/plate-break';
import { createHorizontalRulePlugin } from '@udecode/plate-horizontal-rule';
// import { createIndentPlugin } from '@udecode/plate-indent';
import { createListPlugin } from '@udecode/plate-list';
// import { createIndentListPlugin } from '@udecode/plate-indent-list';
import { createKbdPlugin } from '@udecode/plate-kbd';
import { createLinkPlugin } from '@udecode/plate-link';
import { createParagraphPlugin } from '@udecode/plate-paragraph';
import { createSelectOnBackspacePlugin } from '@udecode/plate-select';
// import { createTablePlugin } from '@udecode/plate-table';
import { createInlineVoidPlugin, createPlugins } from '@udecode/plate-core';
import { createDndPlugin } from '@udecode/plate-dnd';
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block';

import { createAutoCompletePlugin, createCodeBlockPlugin } from '../plugins';
import { createComboBoxPlugin } from '../plugins/comboBox';
import { createHeadingPlugin } from '../plugins/heading';
import { createMacroPlugin } from '../plugins/macro';
import { createSetVariablePlugin } from '../plugins/set';
import { createWidgetPlugin } from '../plugins/widget';
import { CONFIG } from './config';

export const basicElements = createPlugins([
  createBlockquotePlugin(),
  createCodeBlockPlugin(),
  createHeadingPlugin(),
  createParagraphPlugin(),
  createHorizontalRulePlugin(),
  createListPlugin(),
  // createIndentListPlugin(),
  createLinkPlugin(),
  // createTablePlugin(),
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
  createDndPlugin({ options: { enableScroller: true } }),
  // createIndentPlugin(),
  createKbdPlugin(),
  createInlineVoidPlugin(),
  /**
   * Add a trailing block when the last node type is not `type` and when the editor has .
   */
  createTrailingBlockPlugin(),
]);
export const twAdvancedElements = createPlugins([createWidgetPlugin(), createMacroPlugin(), createSetVariablePlugin()]);
