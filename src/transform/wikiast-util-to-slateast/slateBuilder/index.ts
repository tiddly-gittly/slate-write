/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as slate from '../../slate';
import * as mdast from '../../mdast';

import { Blockquote, blockquote } from './blockquote';
import { LineBreak, lineBreak } from './break';
import { Code, code } from './code';
import { Definition, definition } from './definition';
import { Footnote, footnote } from './footnote';
import { FootnoteDefinition, footnoteDefinition } from './footnoteDefinition';
import { FootnoteReference, footnoteReference } from './footnoteReference';
import { Heading, heading } from './heading';
import { Html, html } from './html';
import { Image, image } from './image';
import { ImageReference, imageReference } from './imageReference';
import { InlineMath, inlineMath } from './inlineMath';
import { Link, link } from './link';
import { LinkReference, linkReference } from './linkReference';
import { List, list } from './list';
import { ListItem, listItem } from './listItem';
import { Paragraph, paragraph } from './paragraph';
import { Text, text } from './text';
import { Table, table } from './table';
import { TableCell, tableCell } from './tableCell';
import { TableRow, tableRow } from './tableRow';
import { ThematicBreak, thematicBreak } from './thematicBreak';
import { Toml, toml } from './toml';
import { Yaml, yaml } from './yaml';
import { mark } from './mark';
import { InlineCode, inlineCode } from './inlineCode';
import { Math, math } from './math';

export type Decoration = Readonly<{
  [key in (mdast.Emphasis | mdast.Strong | mdast.Delete | mdast.InlineCode)['type']]?: true;
}>;

export type SlateBuilder = (node: mdast.Content, deco: Decoration) => slate.Node[];

export type SlateNode =
  | Paragraph
  | Heading
  | ThematicBreak
  | Blockquote
  | List
  | ListItem
  | Table
  | TableRow
  | TableCell
  | Html
  | Code
  | Yaml
  | Toml
  | Definition
  | FootnoteDefinition
  | Text
  | LineBreak
  | Link
  | Image
  | LinkReference
  | InlineCode
  | ImageReference
  | Footnote
  | FootnoteReference
  | Math
  | InlineMath;

export const builders = {
  blockquote,
  break: lineBreak,
  code,
  definition,
  footnote,
  footnoteDefinition,
  footnoteReference,
  heading,
  html,
  image,
  imageReference,
  inlineMath,
  inlineCode,
  link,
  linkReference,
  list,
  listItem,
  emphasis: mark,
  strong: mark,
  delete: mark,
  math,
  paragraph,
  text,
  table,
  tableCell,
  tableRow,
  thematicBreak,
  toml,
  yaml,
};
export type IBuilders = typeof builders;
