import { createPluginFactory } from '@udecode/plate-core';

export const ELEMENT_SET = 'set';

/**
 * As tiddlywiki.com said https://tiddlywiki.com/#Variables%20in%20WikiText
 */
export const createSetVariablePlugin = createPluginFactory({
  key: ELEMENT_SET,
  isElement: true,
  isVoid: true,
});
