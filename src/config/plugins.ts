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

const basicElements = createPlugins([
  createBlockquotePlugin(),
  createCodeBlockPlugin(),
  createHeadingPlugin(),
  createParagraphPlugin(),
  createHorizontalRulePlugin(),
  createListPlugin(),
  createImagePlugin(),
]);

const basicMarks = createPlugins([
  createBoldPlugin(),
  createCodePlugin(),
  createItalicPlugin(),
  createStrikethroughPlugin(),
  createSubscriptPlugin(),
  createSuperscriptPlugin(),
  createUnderlinePlugin(),
]);
const utils = createPlugins([
  createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
  createSoftBreakPlugin(CONFIG.softBreak),
  createExitBreakPlugin(CONFIG.exitBreak),
  createAutoformatPlugin(CONFIG.autoformat),
  createDndPlugin(),
]);

export const PLUGINS = {
  basicElements,
  basicMarks,
  utils,
};
