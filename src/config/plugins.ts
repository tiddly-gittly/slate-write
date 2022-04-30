import {
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createTrailingBlockPlugin,
  createTablePlugin,
  createDndPlugin,
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
} from '@udecode/plate';
import { CONFIG } from './config';
import { createHeadingPlugin } from './plugins/heading';
import { createWidgetPlugin } from './plugins/widget';

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
  createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
  createSoftBreakPlugin(CONFIG.softBreak),
  createExitBreakPlugin(CONFIG.exitBreak),
  createAutoformatPlugin(CONFIG.autoformat),
  createDndPlugin(),
  createIndentListPlugin(),
  createIndentPlugin(),
  createKbdPlugin(),
  /**
   * Add a trailing block when the last node type is not `type` and when the editor has .
   */
  createTrailingBlockPlugin(),
]);
export const twAdvancedElements = createPlugins([createWidgetPlugin()]);
