import { createPlateUI, ELEMENT_LINK, LinkElement, ELEMENT_OL, ELEMENT_UL, withProps, StyledElement } from '@udecode/plate';
import { withStyledDraggables } from '../config/withStyledDraggables';
import { withStyledPlaceHolders } from '../config/withStyledPlaceHolders';
import { ELEMENT_WIDGET, WidgetBlock } from '../plugins/widget';

// only component defined here will be wrapped by withStyledDraggables and withStyledPlaceHolders
const rawComponents = createPlateUI({
  [ELEMENT_WIDGET]: WidgetBlock,
  [ELEMENT_LINK]: LinkElement,
  [ELEMENT_OL]: withProps(StyledElement, {
    as: 'ol',
  }),
  [ELEMENT_UL]: withProps(StyledElement, {
    as: 'ul',
  }),
});
export const components = withStyledDraggables(withStyledPlaceHolders(rawComponents));
