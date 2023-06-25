/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_LI } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';

import type { PlatePluginComponent } from '@udecode/slate';
import type { DefaultPlatePluginKey } from '@udecode/plate-ui';
import { css } from 'styled-components';
import { ELEMENT_CODE_BLOCK } from '../plugins/codeblock/constants';
import { withDraggables } from '../plugins/dnd';
import { ELEMENT_MACRO } from '../plugins/macro';
import { ELEMENT_WIDGET } from '../plugins/widget';

export const withStyledDraggables = (components: any): Record<DefaultPlatePluginKey, PlatePluginComponent<any>> => {
  return withDraggables(components, [
    // only element that registered keys here will have dnd grabber
    {
      key: ELEMENT_LI,
      styles: {
        gutterLeft: css`
          transform: translateX(-6em);
        `,
      },
    },
    {
      key: ELEMENT_H1,
      styles: {
        gutterLeft: css`
          padding: 0 0 4px;
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
          padding: 0 0 1px;
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
          padding: 0 0 1px;
          font-size: 1.25em;
        `,
        blockToolbarWrapper: css`
          height: 1.3em;
        `,
      },
    },
    {
      key: ELEMENT_H4,
      styles: {
        gutterLeft: css`
          padding: 0 0 0;
          font-size: 0.9em;
        `,
        blockToolbarWrapper: css`
          height: 1.3em;
        `,
      },
    },
    {
      keys: [ELEMENT_H5, ELEMENT_H6],
      styles: {
        gutterLeft: css`
          padding: 0;
          margin-top: -0.4em;
        `,
      },
    },
    {
      key: ELEMENT_PARAGRAPH,
    },
    {
      key: ELEMENT_BLOCKQUOTE,
    },
    {
      key: ELEMENT_CODE_BLOCK,
      styles: {
        gutterLeft: css`
          padding-top: 0.2em;
        `,
      },
    },
    {
      keys: [ELEMENT_WIDGET, ELEMENT_MACRO],
      level: 0,
    },
  ]);
};
