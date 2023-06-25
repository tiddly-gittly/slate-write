import { createPluginFactory } from '@udecode/plate-core';

export const ELEMENT_MACRO = 'macro';

/**
 * As tiddlywiki.com said
 *
 * > The syntax is actually a shorthand for a $macrocall widget
 *
 * So the MacroBlock is just a wrapper of WidgetBlock too
 *
 */
export const createMacroPlugin = createPluginFactory({
  key: ELEMENT_MACRO,
  isElement: true,
  isVoid: true,
});
