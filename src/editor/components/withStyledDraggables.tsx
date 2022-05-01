/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { DragIndicator } from '@styled-icons/material/DragIndicator';
import Tippy from '@tippyjs/react';
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
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_TABLE,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
  grabberTooltipProps,
  withDraggables,
} from '@udecode/plate';
import { css } from 'styled-components';
import { ELEMENT_WIDGET } from '../../config/plugins/widget';

export const withStyledDraggables = (components: any): ReturnType<typeof createPlateUI> => {
  return withDraggables(components, [
    {
      keys: [
        ELEMENT_PARAGRAPH,
        ELEMENT_BLOCKQUOTE,
        ELEMENT_TODO_LI,
        ELEMENT_H1,
        ELEMENT_H2,
        ELEMENT_H3,
        ELEMENT_H4,
        ELEMENT_H5,
        ELEMENT_H6,
        ELEMENT_IMAGE,
        ELEMENT_OL,
        ELEMENT_UL,
        ELEMENT_TABLE,
        ELEMENT_MEDIA_EMBED,
        ELEMENT_CODE_BLOCK,
        ELEMENT_WIDGET,
      ],
      onRenderDragHandle: ({ styles, ...props }) => (
        <Tippy {...grabberTooltipProps}>
          <button type="button" {...props} css={styles}>
            <DragIndicator
              style={{
                width: 18,
                height: 18,
                color: 'rgba(55, 53, 47, 0.3)',
              }}
            />
          </button>
        </Tippy>
      ),
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
