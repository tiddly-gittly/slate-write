/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HEADING_KEYS } from '@udecode/plate-heading';

import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { ParagraphPlugin } from '@udecode/plate-core/react';
import { ListPlugin } from '@udecode/plate-list/react';
import { ELEMENT_CODE_BLOCK } from 'wikiast-utils';
import type { withDraggablesPrimitive } from '../components/plate-ui/with-draggables';
import { addDropHandlers } from '../plugins';

export type DraggableComponents = Parameters<typeof withDraggablesPrimitive>[1];
// only element that registered keys here will have dnd grabber
export const draggableComponents = [
  {
    // allow li drag, not ul/ol, because ol/ul will move entire list tree. While user might just want to move a single line of li.
    keys: [ListPlugin.key /* , ELEMENT_OL, ELEMENT_UL */],
    draggableProps: {
      className: '[&_.slate-gutterLeft]:-translate-x-11 [&_.slate-gutterLeft]:overflow-visible',
    },
    level: null,
  },
  {
    key: HEADING_KEYS.h1,
    draggableProps: {
      className: '[&_.slate-blockToolbarWrapper]:h-auto [&_.slate-gutterLeft]:px-0 [&_.slate-gutterLeft]:pb-1 [&_.slate-gutterLeft]:text-[1.875em]',
    },
  },
  {
    key: HEADING_KEYS.h2,
    draggableProps: {
      className: '[&_.slate-blockToolbarWrapper]:h-auto [&_.slate-gutterLeft]:px-0 [&_.slate-gutterLeft]:pb-px [&_.slate-gutterLeft]:text-[1.5em]',
    },
  },
  {
    key: HEADING_KEYS.h3,
    draggableProps: {
      className: '[&_.slate-blockToolbarWrapper]:h-auto [&_.slate-gutterLeft]:px-0 [&_.slate-gutterLeft]:pb-px [&_.slate-gutterLeft]:text-[1.25em]',
    },
  },
  {
    key: HEADING_KEYS.h4,
    draggableProps: {
      className: '[&_.slate-blockToolbarWrapper]:h-auto [&_.slate-gutterLeft]:px-0 [&_.slate-gutterLeft]:pb-0 [&_.slate-gutterLeft]:text-[0.9em]',
    },
  },
  {
    keys: [HEADING_KEYS.h5, HEADING_KEYS.h6],
    draggableProps: {
      className: '[&_.slate-gutterLeft]:px-0 [&_.slate-gutterLeft]:-mt-1',
    },
  },
  {
    keys: [ParagraphPlugin.key],
    draggableProps: {
      className: '[&_.slate-gutterLeft]:px-0',
    },
  },
  {
    key: BlockquotePlugin.key,
    draggableProps: {
      className: '[&_.slate-gutterLeft]:px-0 [&_.slate-gutterLeft]:pb-0',
    },
  },
  {
    key: ELEMENT_CODE_BLOCK,
    draggableProps: {
      className: '[&_.slate-gutterLeft]:pt-[0.2em]',
    },
  },
] satisfies DraggableComponents;
addDropHandlers(draggableComponents);
