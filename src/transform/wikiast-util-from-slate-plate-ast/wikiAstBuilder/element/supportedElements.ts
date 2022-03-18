import htmlTags from 'html-tags';

import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH } from '@udecode/plate-basic-marks';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { ELEMENT_LI, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

export const isHTMLElement = (tag: string): tag is keyof HTMLElementTagNameMap => htmlTags.includes(tag);

export const supportedSlateElements = [
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_LINK,
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_UL,
  ELEMENT_PARAGRAPH,
] as const;
