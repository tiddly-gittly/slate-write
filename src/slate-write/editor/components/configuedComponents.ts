/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_SUBSCRIPT, MARK_SUPERSCRIPT, MARK_UNDERLINE } from '@udecode/plate-basic-marks';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { MARK_HIGHLIGHT } from '@udecode/plate-highlight';
import { MARK_KBD } from '@udecode/plate-kbd';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { ELEMENT_LI, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import { PlatePluginComponent } from '@udecode/plate-core';
import { ELEMENT_TABLE, ELEMENT_TD, ELEMENT_TH, ELEMENT_TR } from '@udecode/plate-table';
import { PlateElement, PlateLeaf, withProps } from '@udecode/plate-utils';
import type { FunctionComponent } from 'react';
import { ELEMENT_CODE_BLOCK } from 'wikiast-util-from-slate-plate-ast';
import { DefaultPlatePluginKey } from '../config/DefaultPlatePluginKey';
import { CodeBlockElement, ELEMENT_AUTO_COMPLETE, ELEMENT_AUTO_COMPLETE_INPUT, LinkElement } from '../plugins';
import { ELEMENT_MACRO } from '../plugins/macro';
import { ELEMENT_WIDGET } from '../plugins/widget';
import { WidgetBlock } from '../plugins/widget/WidgetBlock';
import { BlockquoteElement } from './plate-ui/blockquote-element';
import { MentionElement } from './plate-ui/mention-element';
import { MentionInputElement } from './plate-ui/mention-input-element';
import { withPlaceholders } from './plate-ui/placeholder';
import { TableCellElement } from './plate-ui/table-cell-element';
import { TableElement } from './plate-ui/table-element';
import { TableRowElement } from './plate-ui/table-row-element';
import { withDraggables } from './plate-ui/with-draggables';

export const createPlateUI = <
  T extends string = string,
  R extends Record<DefaultPlatePluginKey | T, PlatePluginComponent | FunctionComponent<any>> = Record<DefaultPlatePluginKey | T, PlatePluginComponent | FunctionComponent<any>>,
>(
  overrideByKey?: Partial<R>,
): R => {
  const components = {} as R;

  if (overrideByKey !== undefined) {
    Object.keys(overrideByKey).forEach((key) => {
      const newOne = overrideByKey[key as keyof R];
      if (newOne !== undefined) {
        components[key as keyof R] = newOne;
      }
    });
  }
  return components;
};

// only component defined here will be wrapped by withDraggables and withStyledPlaceHolders
const rawComponents = createPlateUI({
  [ELEMENT_AUTO_COMPLETE]: MentionElement,
  [ELEMENT_AUTO_COMPLETE_INPUT]: MentionInputElement,
  [ELEMENT_WIDGET]: WidgetBlock,
  [ELEMENT_MACRO]: WidgetBlock,
  [ELEMENT_LINK]: LinkElement,
  [ELEMENT_CODE_BLOCK]: CodeBlockElement,
  [ELEMENT_PARAGRAPH]: withProps(PlateElement, {
    as: 'p',
  }),

  [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
  // [ELEMENT_CODE_LINE]: CodeLineElement,
  // [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
  // TODO: use basic hr element, plate's is wiredly huge
  // [ELEMENT_HR]: HrElement,
  [ELEMENT_H1]: withProps(PlateElement, {
    as: 'h1',
  }),
  [ELEMENT_H2]: withProps(PlateElement, {
    as: 'h2',
  }),
  [ELEMENT_H3]: withProps(PlateElement, {
    as: 'h3',
  }),
  [ELEMENT_H4]: withProps(PlateElement, {
    as: 'h4',
  }),
  [ELEMENT_H5]: withProps(PlateElement, {
    as: 'h5',
  }),
  [ELEMENT_H6]: withProps(PlateElement, {
    as: 'h6',
  }),
  [ELEMENT_LI]: withProps(PlateElement, { as: 'li' }),
  [ELEMENT_UL]: withProps(PlateElement, {
    as: 'ul',
  }),
  [ELEMENT_OL]: withProps(PlateElement, {
    as: 'ol',
  }),
  [ELEMENT_TABLE]: TableElement,
  [ELEMENT_TD]: TableCellElement,
  [ELEMENT_TH]: withProps(PlateElement, {
    as: 'th',
  }),
  [ELEMENT_TR]: TableRowElement,
  // [ELEMENT_TODO_LI]: TodoListElement,
  [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
  [MARK_CODE]: withProps(PlateLeaf, {
    as: 'code',
  }),
  [MARK_HIGHLIGHT]: withProps(PlateLeaf, {
    as: 'mark',
    style: {
      backgroundColor: '#fef3b7',
    },
  }),
  [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
  [MARK_KBD]: withProps(PlateLeaf, {
    as: 'kbd',
  }),
  [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
  [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
  [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
  [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
});
export const components = withDraggables(withPlaceholders(rawComponents));
