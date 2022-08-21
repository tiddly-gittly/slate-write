import { createPlateUI } from '@udecode/plate-ui';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { LinkElement } from '@udecode/plate-ui-link';
import { ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { withProps } from '@udecode/plate-core';
import { StyledElement } from '@udecode/plate-styled-components';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { MentionElement, MentionInputElement } from '@udecode/plate-ui-mention';
import { css } from 'styled-components';
import { withStyledDraggables } from '../config/withStyledDraggables';
import { withStyledPlaceHolders } from '../config/withStyledPlaceHolders';
import { ELEMENT_AUTO_COMPLETE, ELEMENT_AUTO_COMPLETE_INPUT } from '../plugins/autoComplete';
import { CodeBlockElement, ELEMENT_CODE_BLOCK } from '../plugins/codeblock';
import { ELEMENT_MACRO } from '../plugins/macro';
import { ELEMENT_WIDGET, WidgetBlock } from '../plugins/widget';

// only component defined here will be wrapped by withStyledDraggables and withStyledPlaceHolders
const rawComponents = createPlateUI({
  [ELEMENT_AUTO_COMPLETE]: MentionElement,
  [ELEMENT_AUTO_COMPLETE_INPUT]: MentionInputElement,
  [ELEMENT_WIDGET]: WidgetBlock,
  [ELEMENT_MACRO]: WidgetBlock,
  [ELEMENT_LINK]: LinkElement,
  [ELEMENT_CODE_BLOCK]: CodeBlockElement,
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
