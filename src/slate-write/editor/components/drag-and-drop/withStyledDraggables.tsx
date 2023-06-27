/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_LI } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';

import type { PlatePluginComponent } from '@udecode/plate-core';
import { withPlateDraggables } from '@udecode/plate-ui-dnd';
import { DefaultPlatePluginKey } from '../../config/DefaultPlatePluginKey';
import { ELEMENT_CODE_BLOCK } from '../../plugins/codeblock/constants';
import { ELEMENT_MACRO } from '../../plugins/macro';
import { ELEMENT_WIDGET } from '../../plugins/widget';
import { DragHandle } from './DragHandle';

const draggableComponents: Parameters<typeof withPlateDraggables>[1] = [
  // only element that registered keys here will have dnd grabber
  {
    // allow li drag, not ul/ol, because ol/ul will move entire list tree. While user might just want to move a single line of li.
    keys: [ELEMENT_LI /* , ELEMENT_OL, ELEMENT_UL */],
    draggableProps: {
      styles: {
        // fix list item mark (dot on the left) covered by drag handle
        gutterLeft: { transform: 'translateX(-200%)' },
        block: {
          // fix list item mark (dot on the left) not visible
          overflow: 'visible',
        },
      },
    },
    level: null,
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
          height: 'unset',
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
          height: 'unset',
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
          height: 'unset',
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
          height: 'unset',
        },
      },
    },
  },
  {
    keys: [ELEMENT_H5, ELEMENT_H6, ELEMENT_PARAGRAPH],
    draggableProps: {
      styles: {
        gutterLeft: {
          padding: '0',
          marginTop: '1.05em',
        },
      },
    },
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
];

export const withStyledDraggables = (components: any): Record<DefaultPlatePluginKey, PlatePluginComponent<any>> => {
  const dragHandleConfig = {
    keys: draggableComponents.flatMap((component) => Array.isArray(component.keys) ? component.keys : [component.key]) as string[],
    draggableProps: {
      onRenderDragHandle: () => {
        return <DragHandle />;
      },
    },
  };
  return withPlateDraggables(components, [...draggableComponents, dragHandleConfig]);
};
