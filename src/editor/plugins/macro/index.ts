import { createPluginFactory } from '@udecode/plate';
export { MacroBlock } from './MacroBlock';

export const ELEMENT_MACRO = 'macro';

export const createMacroPlugin = createPluginFactory({
  key: ELEMENT_MACRO,
  isElement: true,
  isVoid: false,
});
