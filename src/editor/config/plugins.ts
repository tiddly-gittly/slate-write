import {
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodePlugin,
  createTrailingBlockPlugin,
  createTablePlugin,
  createExitBreakPlugin,
  createHorizontalRulePlugin,
  createImagePlugin,
  createItalicPlugin,
  createIndentListPlugin,
  createIndentPlugin,
  createKbdPlugin,
  createLinkPlugin,
  createListPlugin,
  createParagraphPlugin,
  createPlugins,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
  createComboboxPlugin,
  createMentionPlugin,
  createInlineVoidPlugin,
} from '@udecode/plate';
import { CONFIG } from './config';
import { createHeadingPlugin } from '../plugins/heading';
import { createCodeBlockPlugin } from '../plugins/codeblock';
import { createWidgetPlugin } from '../plugins/widget';
import { createDndPlugin } from '../plugins/dnd';
import { createMacroPlugin } from '../plugins/macro';

export const basicElements = createPlugins([
  createBlockquotePlugin(),
  createCodeBlockPlugin(),
  createHeadingPlugin(),
  createParagraphPlugin(),
  createHorizontalRulePlugin(),
  createListPlugin(),
  createImagePlugin(),
  createLinkPlugin(),
  createTablePlugin(),
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
  createComboboxPlugin(),
  createMentionPlugin(CONFIG.mention),
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
