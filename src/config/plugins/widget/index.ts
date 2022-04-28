import { createPluginFactory } from '@udecode/plate';
import { WidgetBlock } from './WidgetBlock';

export const ELEMENT_WIDGET = 'widget';

export const createWidgetPlugin = createPluginFactory({
  key: ELEMENT_WIDGET,
  type: ELEMENT_WIDGET,
  isElement: true,
  isVoid: true,
  component: WidgetBlock,
});
