
import { withProps } from '@udecode/cn';
import { BoldPlugin, CodePlugin, ItalicPlugin, StrikethroughPlugin, SubscriptPlugin, SuperscriptPlugin, UnderlinePlugin } from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin, CodeLinePlugin, CodeSyntaxPlugin } from '@udecode/plate-code-block/react';
import { ParagraphPlugin } from '@udecode/plate-common/react';
import { type NodeComponent, PlateElement, PlateLeaf } from '@udecode/plate-common/react';
import { FindReplacePlugin } from '@udecode/plate-find-replace';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { TocPlugin } from '@udecode/plate-heading/react';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { BulletedListPlugin, ListItemPlugin, NumberedListPlugin, TodoListPlugin } from '@udecode/plate-list/react';
import { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react';
import { MentionInputPlugin, MentionPlugin } from '@udecode/plate-mention/react';
import { SlashInputPlugin } from '@udecode/plate-slash-command/react';
import { TableCellHeaderPlugin, TableCellPlugin, TablePlugin, TableRowPlugin } from '@udecode/plate-table/react';
import { BlockquoteElement } from './plate-ui/blockquote-element';
import { MentionElement } from './plate-ui/mention-element';
import { MentionInputElement } from './plate-ui/mention-input-element';
import { withPlaceholders } from './plate-ui/placeholder';
import { TableCellElement } from './plate-ui/table-cell-element';
import { TableElement } from './plate-ui/table-element';
import { TableRowElement } from './plate-ui/table-row-element';
import { withDraggables } from './plate-ui/with-draggables';

export const createPlateUI = () => {
  let components: Record<string, NodeComponent> = {
    [BlockquotePlugin.key]: BlockquoteElement,
    [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
    [BulletedListPlugin.key]: withProps(ListElement, { variant: 'ul' }),
    [CodeBlockPlugin.key]: CodeBlockElement,
    [CodeLinePlugin.key]: CodeLineElement,
    [CodePlugin.key]: CodeLeaf,
    [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
    [ColumnItemPlugin.key]: ColumnElement,
    [ColumnPlugin.key]: ColumnGroupElement,
    [CommentsPlugin.key]: CommentLeaf,
    [DatePlugin.key]: DateElement,
    [EmojiInputPlugin.key]: EmojiInputElement,
    [ExcalidrawPlugin.key]: ExcalidrawElement,
    [FindReplacePlugin.key]: SearchHighlightLeaf,
    [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
    [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
    [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
    [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
    [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
    [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
    [HighlightPlugin.key]: HighlightLeaf,
    [HorizontalRulePlugin.key]: HrElement,
    [ImagePlugin.key]: ImageElement,
    [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
    [KbdPlugin.key]: KbdLeaf,
    [LinkPlugin.key]: LinkElement,
    [ListItemPlugin.key]: withProps(PlateElement, { as: 'li' }),
    [MediaEmbedPlugin.key]: MediaEmbedElement,
    [MentionInputPlugin.key]: MentionInputElement,
    [MentionPlugin.key]: MentionElement,
    [NumberedListPlugin.key]: withProps(ListElement, { variant: 'ol' }),
    [ParagraphPlugin.key]: ParagraphElement,
    [SlashInputPlugin.key]: SlashInputElement,
    [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
    [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
    [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
    [TableCellHeaderPlugin.key]: TableCellHeaderElement,
    [TableCellPlugin.key]: TableCellElement,
    [TablePlugin.key]: TableElement,
    [TableRowPlugin.key]: TableRowElement,
    [TocPlugin.key]: TocElement,
    [TodoListPlugin.key]: TodoListElement,
    [TogglePlugin.key]: ToggleElement,
    [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
  };

  components = withPlaceholders(components);
  components = withDraggables(components);

  return components;
};
