/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_LI } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';

import { ELEMENT_CODE_BLOCK } from '../plugins/codeblock/constants';
import { ELEMENT_MACRO } from '../plugins/macro';
import { ELEMENT_WIDGET } from '../plugins/widget';

// only element that registered keys here will have dnd grabber
export const draggableComponents = [
  {
    // allow li drag, not ul/ol, because ol/ul will move entire list tree. While user might just want to move a single line of li.
    keys: [ELEMENT_LI /* , ELEMENT_OL, ELEMENT_UL */],
    draggableProps: {
      classNames: {
        // fix list item mark (dot on the left) covered by drag handle  transform: 'translateX(-200%)'
        gutterLeft: 'transform-translate-x-[-200%]',
        // fix list item mark (dot on the left) not visible
        block: 'overflow-visible',
      },
    },
    level: null,
  },
  {
    key: ELEMENT_H1,
    draggableProps: {
      classNames: {
        gutterLeft: 'px-0 pb-1 text-[1.875em]',
        blockToolbarWrapper: 'h-auto',
      },
    },
  },
  {
    key: ELEMENT_H2,
    draggableProps: {
      classNames: {
        gutterLeft: 'px-0 pb-px text-[1.5em]',
        blockToolbarWrapper: 'h-auto',
      },
    },
  },
  {
    key: ELEMENT_H3,
    draggableProps: {
      classNames: {
        gutterLeft: 'px-0 pb-px text-[1.25em]',
        blockToolbarWrapper: 'h-auto',
      },
    },
  },
  {
    key: ELEMENT_H4,
    draggableProps: {
      classNames: {
        gutterLeft: 'px-0 pb-0 text-[0.9em]',
        blockToolbarWrapper: 'h-auto',
      },
    },
  },
  {
    keys: [ELEMENT_H5, ELEMENT_H6, ELEMENT_PARAGRAPH],
    draggableProps: {
      classNames: {
        gutterLeft: 'px-0 mt-[1.05em]',
      },
    },
  },
  {
    key: ELEMENT_BLOCKQUOTE,
  },
  {
    key: ELEMENT_CODE_BLOCK,
    draggableProps: {
      classNames: {
        gutterLeft: 'pt-[0.2em]',
      },
    },
  },
  {
    keys: [ELEMENT_WIDGET, ELEMENT_MACRO],
    level: 0,
  },
];
