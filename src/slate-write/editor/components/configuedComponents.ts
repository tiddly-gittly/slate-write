
import { withProps } from '@udecode/cn';
import { BoldPlugin, CodePlugin, ItalicPlugin, StrikethroughPlugin, SubscriptPlugin, SuperscriptPlugin, UnderlinePlugin } from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin, CodeLinePlugin, CodeSyntaxPlugin } from '@udecode/plate-code-block/react';
import { ParagraphPlugin } from '@udecode/plate-common/react';
import { type NodeComponent, PlateElement, PlateLeaf } from '@udecode/plate-common/react';
import { FindReplacePlugin } from '@udecode/plate-find-replace';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { BulletedListPlugin, ListItemPlugin, NumberedListPlugin } from '@udecode/plate-list/react';
import { ImagePlugin } from '@udecode/plate-media/react';
import { SlashInputPlugin } from '@udecode/plate-slash-command/react';
import { TableCellHeaderPlugin, TableCellPlugin, TablePlugin, TableRowPlugin } from '@udecode/plate-table/react';
import { LinkElement } from './plate-ui/link-element';
import { BlockquoteElement } from './plate-ui/blockquote-element';
import { CodeBlockElement } from './plate-ui/code-block-element';
import { CodeLeaf } from './plate-ui/code-leaf';
import { CodeLineElement } from './plate-ui/code-line-element';
import { CodeSyntaxLeaf } from './plate-ui/code-syntax-leaf';
import { HeadingElement } from './plate-ui/heading-element';
import { HrElement } from './plate-ui/hr-element';
import { ImageElement } from './plate-ui/image-element';
import { KbdLeaf } from './plate-ui/kbd-leaf';
import { ListElement } from './plate-ui/list-element';
import { ParagraphElement } from './plate-ui/paragraph-element';
import { withPlaceholders } from './plate-ui/placeholder';
import { SearchHighlightLeaf } from './plate-ui/search-highlight-leaf';
import { SlashInputElement } from './plate-ui/slash-input-element';
import { TableCellElement, TableCellHeaderElement } from './plate-ui/table-cell-element';
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
    [FindReplacePlugin.key]: SearchHighlightLeaf,
    [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
    [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
    [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
    [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
    [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
    [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
    [HorizontalRulePlugin.key]: HrElement,
    [ImagePlugin.key]: ImageElement,
    [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
    [KbdPlugin.key]: KbdLeaf,
    [LinkPlugin.key]: LinkElement,
    [ListItemPlugin.key]: withProps(PlateElement, { as: 'li' }),
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
    [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
  };

  components = withPlaceholders(components);
  components = withDraggables(components);

  return components;
};
