import { createPlateUI, ELEMENT_LINK, LinkElement, ELEMENT_OL, ELEMENT_UL, withProps, StyledElement, ELEMENT_PARAGRAPH } from '@udecode/plate';
import { css } from 'styled-components';
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
  [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
    as: 'p',
    styles: {
      root: css`
        padding: 0;
      `,
    },
  }),
});
export const components = withStyledDraggables(withStyledPlaceHolders(rawComponents));
