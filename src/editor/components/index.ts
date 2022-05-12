import { createPlateUI, ELEMENT_LINK, LinkElement, ELEMENT_OL, withProps, StyledElement } from '@udecode/plate';
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
    styles: {
      root: css`
        margin: 0;
        padding-inline-start: 2em;
      `,
    },
  }),
});
export const components = withStyledDraggables(withStyledPlaceHolders(rawComponents));
