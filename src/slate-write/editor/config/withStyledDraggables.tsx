/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_LI } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';

import type { PlatePluginComponent } from '@udecode/plate-core';
import type { DefaultPlatePluginKey } from '@udecode/plate-ui';
import { withPlateDraggables } from '@udecode/plate-ui-dnd';
import { ELEMENT_CODE_BLOCK } from '../plugins/codeblock/constants';
import { ELEMENT_MACRO } from '../plugins/macro';
import { ELEMENT_WIDGET } from '../plugins/widget';

export const withStyledDraggables = (components: any): Record<DefaultPlatePluginKey, PlatePluginComponent<any>> => {
  return withPlateDraggables(components, [
    // only element that registered keys here will have dnd grabber
    {
      keys: [
        ELEMENT_PARAGRAPH,
        ELEMENT_BLOCKQUOTE,
        ELEMENT_LI,
        ELEMENT_H1,
        ELEMENT_H2,
        ELEMENT_H3,
        ELEMENT_H4,
        ELEMENT_H5,
        ELEMENT_H6,
        ELEMENT_CODE_BLOCK,
      ],
      draggableProps: {
        onRenderDragHandle: () => {
          return (
            <button type='button' className='drag-button'>
              Drag
            </button>
          );
        },
      },
    },
    {
      key: ELEMENT_LI,
      draggableProps: {
        styles: {
          gutterLeft: { transform: 'translateX(-6em)' },
        },
      },
    },
    {
      key: ELEMENT_H1,
      draggableProps: {
        styles: {
          gutterLeft: {
            padding: '0 0 4px',
            fontSize: '1.875em',
          },
          blockToolbarWrapper: {
            height: '1.3em',
          },
        },
      },
    },
    {
      key: ELEMENT_H2,
      draggableProps: {
        styles: {
          gutterLeft: {
            padding: '0 0 1px',
            fontSize: '1.5em',
          },
          blockToolbarWrapper: {
            height: '1.3em',
          },
        },
      },
    },
    {
      key: ELEMENT_H3,
      draggableProps: {
        styles: {
          gutterLeft: {
            padding: '0 0 1px',
            fontSize: '1.25em',
          },
          blockToolbarWrapper: {
            height: '1.3em',
          },
        },
      },
    },
    {
      key: ELEMENT_H4,
      draggableProps: {
        styles: {
          gutterLeft: {
            padding: '0 0 0',
            fontSize: '0.9em',
          },
          blockToolbarWrapper: {
            height: '1.3em',
          },
        },
      },
    },
    {
      keys: [ELEMENT_H5, ELEMENT_H6],
      draggableProps: {
        styles: {
          gutterLeft: {
            padding: '0',
            marginTop: '-0.4em',
          },
        },
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
      draggableProps: {
        styles: {
          gutterLeft: {
            paddingTop: '0.2em',
          },
        },
      },
    },
    {
      keys: [ELEMENT_WIDGET, ELEMENT_MACRO],
      level: 0,
    },
  ]);
};
