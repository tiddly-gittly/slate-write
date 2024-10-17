/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HEADING_KEYS } from '@udecode/plate-heading';

import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { ParagraphPlugin } from '@udecode/plate-core/react';
import { ListPlugin } from '@udecode/plate-list/react';
import { ELEMENT_CODE_BLOCK } from 'wikiast-utils';
import { DraggableComponents } from '../components/plate-ui/with-draggables';
import { addDropHandlers } from '../plugins';

// only element that registered keys here will have dnd grabber
export const draggableComponents: DraggableComponents = [
  {
    // allow li drag, not ul/ol, because ol/ul will move entire list tree. While user might just want to move a single line of li.
    keys: [ListPlugin.key /* , ELEMENT_OL, ELEMENT_UL */],
    draggableProps: {
      classNames: {
        // fix list item mark (dot on the left) covered by drag handle  transform: 'translateX(-200%)'
        gutterLeft: '-translate-x-11',
        // fix list item mark (dot on the left) not visible
        block: 'overflow-visible',
      },
    },
    level: null,
  },
  {
    key: HEADING_KEYS.h1,
    draggableProps: {
      classNames: {
        gutterLeft: 'px-0 pb-1 text-[1.875em]',
        blockToolbarWrapper: 'h-auto',
      },
    },
  },
  {
    key: HEADING_KEYS.h2,
    draggableProps: {
      classNames: {
        gutterLeft: 'px-0 pb-px text-[1.5em]',
        blockToolbarWrapper: 'h-auto',
      },
    },
  },
  {
    key: HEADING_KEYS.h3,
    draggableProps: {
      classNames: {
        gutterLeft: 'px-0 pb-px text-[1.25em]',
        blockToolbarWrapper: 'h-auto',
      },
    },
  },
  {
    key: HEADING_KEYS.h4,
    draggableProps: {
      classNames: {
        gutterLeft: 'px-0 pb-0 text-[0.9em]',
        blockToolbarWrapper: 'h-auto',
      },
    },
  },
  {
    keys: [HEADING_KEYS.h5, HEADING_KEYS.h6],
    draggableProps: {
      classNames: {
        gutterLeft: 'px-0 -mt-1',
      },
    },
  },
  {
    keys: [ParagraphPlugin.key],
    draggableProps: {
      classNames: {
        gutterLeft: 'px-0',
      },
    },
  },
  {
    key: BlockquotePlugin.key,
  },
  {
    key: ELEMENT_CODE_BLOCK,
    draggableProps: {
      classNames: {
        gutterLeft: 'pt-[0.2em]',
      },
    },
  },
];
addDropHandlers(draggableComponents);
