import { createPluginFactory } from '@udecode/plate-core';

export const ELEMENT_VARIABLE = 'variable';

/**
 * As tiddlywiki.com said https://tiddlywiki.com/#Variables%20in%20WikiText
 */
export const createVariablePlugin = createPluginFactory({
  key: ELEMENT_VARIABLE,
  isElement: true,
  isVoid: true,
});
