import type {
  Literal,
  Paragraph,
  Heading,
  ThematicBreak,
  Blockquote,
  List,
  ListItem,
  Table,
  TableRow,
  TableCell,
  HTML,
  Code,
  YAML,
  Definition,
  FootnoteDefinition,
  Text,
  Emphasis,
  Strong,
  Delete,
  InlineCode,
  Break,
  Link,
  Image,
  LinkReference,
  ImageReference,
  Footnote,
  FootnoteReference,
} from 'mdast';

export interface TOML extends Literal {
  type: 'toml';
}
export interface Math extends Literal {
  type: 'math';
}
export interface InlineMath extends Literal {
  type: 'inlineMath';
}
export type Content = TopLevelContent | ListContent | TableContent | RowContent | PhrasingContent;
export type TopLevelContent = BlockContent | FrontmatterContent | DefinitionContent;
export type BlockContent = Paragraph | Heading | ThematicBreak | Blockquote | List | Table | HTML | Code | Math;
export type FrontmatterContent = YAML | TOML;
export type DefinitionContent = Definition | FootnoteDefinition;
export type ListContent = ListItem;
export type TableContent = TableRow;
export type RowContent = TableCell;
export type PhrasingContent = StaticPhrasingContent | Link | LinkReference;
export type StaticPhrasingContent =
  | Text
  | Emphasis
  | Strong
  | Delete
  | HTML
  | InlineCode
  | Break
  | Image
  | ImageReference
  | Footnote
  | FootnoteReference
  | InlineMath;

export {
  type Parent,
  type Root,
  type Resource,
  type Reference,
  type Association,
  type Paragraph,
  type Alternative,
  type Literal,
  type ThematicBreak,
  type Heading,
  type List,
  type Blockquote,
  type Table,
  type ListItem,
  type TableCell,
  type TableRow,
  type Code,
  type HTML,
  type Definition,
  type YAML,
  type FootnoteDefinition,
  type Text,
  type Strong,
  type Emphasis,
  type InlineCode,
  type Delete,
  type Link,
  type Break,
  type LinkReference,
  type Image,
  type Footnote,
  type ImageReference,
  type FootnoteReference,
} from 'mdast';
