import {
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createDndPlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHorizontalRulePlugin,
  createImagePlugin,
  createItalicPlugin,
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
import { createWidgetPlugin } from './plugins/widget';

export const basicElements = createPlugins([
  createBlockquotePlugin(),
  createCodeBlockPlugin(),
  createHeadingPlugin(),
  createParagraphPlugin(),
  createHorizontalRulePlugin(),
  createListPlugin(),
  createImagePlugin(),
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
]);
export const twAdvancedElements = createPlugins([createWidgetPlugin()]);

