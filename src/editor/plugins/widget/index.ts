import { createPluginFactory } from '@udecode/plate-core';
export { WidgetBlock } from './WidgetBlock';

export const ELEMENT_WIDGET = 'widget';

export const createWidgetPlugin = createPluginFactory({
  key: ELEMENT_WIDGET,
  isElement: true,
  isVoid: true,
});
