/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  createPlateUI,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_UL,
  ELEMENT_LI,
} from '@udecode/plate';
import { css } from 'styled-components';
import { ELEMENT_WIDGET } from '../plugins/widget';
import { withDraggables } from '../plugins/dnd';

export const withStyledDraggables = (components: any): ReturnType<typeof createPlateUI> => {
  return withDraggables(components, [
    {
      // only element that registered keys here will have dnd grabber
      keys: [ELEMENT_UL, ELEMENT_OL, ELEMENT_LI],
    },
    {
      key: ELEMENT_H1,
      styles: {
        gutterLeft: css`
          padding: 0.8em 0 4px;
          font-size: 1.875em;
        `,
        blockToolbarWrapper: css`
          height: 1.3em;
        `,
      },
    },
    {
      key: ELEMENT_H2,
      styles: {
        gutterLeft: css`
          padding: 0.8em 0 1px;
          font-size: 1.5em;
        `,
        blockToolbarWrapper: css`
          height: 1.3em;
        `,
      },
    },
    {
      key: ELEMENT_H3,
      styles: {
        gutterLeft: css`
          padding: 0.8em 0 1px;
          font-size: 1.25em;
        `,
        blockToolbarWrapper: css`
          height: 1.3em;
        `,
      },
    },
    {
      keys: [ELEMENT_H4, ELEMENT_H5],
      styles: {
        gutterLeft: css`
          padding: 1em 0 0;
          font-size: 1.1em;
        `,
        blockToolbarWrapper: css`
          height: 1.3em;
        `,
      },
    },
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_H6],
      styles: {
        gutterLeft: css`
          padding-top: 0.3rem;
        `,
      },
    },
    {
      key: ELEMENT_BLOCKQUOTE,
      styles: {
        gutterLeft: css`
          padding-top: 18px;
        `,
      },
    },
    {
      key: ELEMENT_CODE_BLOCK,
      styles: {
        gutterLeft: css`
          padding-top: 1.2rem;
        `,
      },
    },
    {
      key: ELEMENT_WIDGET,
      styles: {
        gutterLeft: css`
          padding-top: 1.2rem;
        `,
      },
    },
  ]);
};
