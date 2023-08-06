/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_SUBSCRIPT, MARK_SUPERSCRIPT, MARK_UNDERLINE } from '@udecode/plate-basic-marks';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { MARK_HIGHLIGHT } from '@udecode/plate-highlight';
import { MARK_KBD } from '@udecode/plate-kbd';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { ELEMENT_LI, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { StyledElement, StyledLeaf } from '@udecode/plate-styled-components';
import { css } from 'styled-components';

import { PlatePluginComponent } from '@udecode/plate-core';
import { ELEMENT_TABLE, ELEMENT_TD, ELEMENT_TH, ELEMENT_TR } from '@udecode/plate-table';
import { withProps } from '@udecode/plate-utils';
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
  [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
    as: 'p',
    styles: {
      root: css`
        padding: 0;
      `,
    },
  }),

  [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
  // [ELEMENT_CODE_LINE]: CodeLineElement,
  // [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
  // TODO: use basic hr element, plate's is wiredly huge
  // [ELEMENT_HR]: HrElement,
  [ELEMENT_H1]: withProps(StyledElement, {
    as: 'h1',
    styles: {
      root: css`
        margin: 2em 0 4px;
        font-size: 1.875em;
        font-weight: 500;
        line-height: 1.3;
      `,
    },
  }),
  [ELEMENT_H2]: withProps(StyledElement, {
    as: 'h2',
    styles: {
      root: css`
        margin: 1.4em 0 1px;
        font-size: 1.5em;
        font-weight: 500;
        line-height: 1.3;
      `,
    },
  }),
  [ELEMENT_H3]: withProps(StyledElement, {
    as: 'h3',
    styles: {
      root: css`
        margin: 1em 0 1px;
        font-size: 1.25em;
        font-weight: 500;
        line-height: 1.3;
        color: #434343;
      `,
    },
  }),
  [ELEMENT_H4]: withProps(StyledElement, {
    as: 'h4',
    styles: {
      root: css`
        margin: 0.75em 0 0;
        font-size: 1.1em;
        font-weight: 500;
        line-height: 1.3;
        color: #666666;
      `,
    },
  }),
  [ELEMENT_H5]: withProps(StyledElement, {
    as: 'h5',
    styles: {
      root: css`
        margin: 0.75em 0 0;
        font-size: 1.1em;
        font-weight: 500;
        line-height: 1.3;
        color: #666666;
      `,
    },
  }),
  [ELEMENT_H6]: withProps(StyledElement, {
    as: 'h6',
    styles: {
      root: css`
        margin: 0.75em 0 0;
        font-size: 1.1em;
        font-weight: 500;
        line-height: 1.3;
        color: #666666;
      `,
    },
  }),
  // TODO: use tw image widget
  // [ELEMENT_IMAGE]: ImageElement,
  [ELEMENT_LI]: withProps(StyledElement, { as: 'li' }),
  // [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
  // [ELEMENT_MENTION]: MentionElement,
  // [ELEMENT_MENTION_INPUT]: MentionInputElement,
  [ELEMENT_UL]: withProps(StyledElement, {
    as: 'ul',
    styles: {
      root: css`
        margin: 0;
        padding-inline-start: 24px;
      `,
    },
  }),
  [ELEMENT_OL]: withProps(StyledElement, {
    as: 'ol',
    styles: {
      root: css`
        margin: 0;
        padding-inline-start: 24px;
      `,
    },
  }),
  [ELEMENT_TABLE]: TableElement,
  [ELEMENT_TD]: TableCellElement,
  [ELEMENT_TH]: withProps(StyledElement, {
    as: 'th',
    styles: {
      root: [
        css`
          padding: 2px;
          text-align: left;
          background-color: rgb(244, 245, 247);
          border: 1px solid rgb(193, 199, 208);
          min-width: 48px;

          > * {
            margin: 0;
          }
        `,
      ],
    },
  }),
  [ELEMENT_TR]: TableRowElement,
  // [ELEMENT_TODO_LI]: TodoListElement,
  [MARK_BOLD]: withProps(StyledLeaf, { as: 'strong' }),
  [MARK_CODE]: withProps(StyledLeaf, {
    as: 'code',
    styles: {
      root: [
        css`
          white-space: pre-wrap;
          font-size: 85%;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
          background-color: rgba(135, 131, 120, 0.15);
          border-radius: 3px;
          padding: 0.2em 0.4em;
          line-height: normal;
        `,
      ],
    },
  }),
  [MARK_HIGHLIGHT]: withProps(StyledLeaf, {
    as: 'mark',
    styles: {
      root: css`
        background-color: #fef3b7;
      `,
    },
  }),
  [MARK_ITALIC]: withProps(StyledLeaf, { as: 'em' }),
  [MARK_KBD]: withProps(StyledLeaf, {
    as: 'kbd',
    styles: {
      root: [
        css`
          white-space: pre-wrap;
          font-size: 75%;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
          background-color: white;
          border: 1px solid black;
          border-radius: 3px;
          padding: 0.2em 0.4em;
          line-height: normal;
          margin-right: 0.2em;
          box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.75);
        `,
      ],
    },
  }),
  [MARK_STRIKETHROUGH]: withProps(StyledLeaf, { as: 's' }),
  [MARK_SUBSCRIPT]: withProps(StyledLeaf, { as: 'sub' }),
  [MARK_SUPERSCRIPT]: withProps(StyledLeaf, { as: 'sup' }),
  [MARK_UNDERLINE]: withProps(StyledLeaf, { as: 'u' }),
});
export const components = withDraggables(withPlaceholders(rawComponents));
