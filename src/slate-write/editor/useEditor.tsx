import { AutoformatPlugin } from '@udecode/plate-autoformat/react';
import { BoldPlugin, CodePlugin, ItalicPlugin, StrikethroughPlugin, SubscriptPlugin, SuperscriptPlugin, UnderlinePlugin } from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { ExitBreakPlugin, SingleLinePlugin, SoftBreakPlugin } from '@udecode/plate-break/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import { ValueOf } from '@udecode/plate-common';
import { ParagraphPlugin, usePlateEditor } from '@udecode/plate-common/react';
import { SlateEditor } from '@udecode/plate-core';
import { DndPlugin } from '@udecode/plate-dnd';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import { IndentPlugin } from '@udecode/plate-indent/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { LineHeightPlugin } from '@udecode/plate-line-height/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { ListPlugin } from '@udecode/plate-list/react';
import { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react';
import { NodeIdPlugin } from '@udecode/plate-node-id';
import { DeletePlugin, SelectOnBackspacePlugin } from '@udecode/plate-select';
import { BlockSelectionPlugin } from '@udecode/plate-selection/react';
import { SlashPlugin } from '@udecode/plate-slash-command/react';
import { TabbablePlugin } from '@udecode/plate-tabbable/react';
import { TablePlugin } from '@udecode/plate-table/react';
import { TrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { MutableRefObject } from 'react';
import { LinkFloatingToolbar } from './components/plate-ui/link-floating-toolbar';
import { createPlateUI } from './components';

export const useSlateWriteEditor = (editorId: string = '', idCreator: () => string, currentAstReference: MutableRefObject<ValueOf<SlateEditor>>, scrollSelector?: string) => {
  const a = usePlateEditor(
    {
      id: editorId,
      override: {
        components: createPlateUI(),
      },
      plugins: [
        // Nodes
        HeadingPlugin.configure({ options: { levels: 6 } }),
        BlockquotePlugin,
        CodeBlockPlugin.configure({
          options: {
            // prism: Prism,
          },
        }),
        HorizontalRulePlugin,
        LinkPlugin.extend({
          render: { afterEditable: () => <LinkFloatingToolbar /> },
        }),
        ListPlugin,
        ImagePlugin,
        MediaEmbedPlugin,
        SlashPlugin,
        TablePlugin,
        // Marks
        BoldPlugin,
        ItalicPlugin,
        UnderlinePlugin,
        StrikethroughPlugin,
        CodePlugin,
        SubscriptPlugin,
        SuperscriptPlugin,
        KbdPlugin,
        IndentPlugin.extend({
          inject: {
            targetPlugins: [
              ParagraphPlugin.key,
              HEADING_KEYS.h1,
              HEADING_KEYS.h2,
              HEADING_KEYS.h3,
              HEADING_KEYS.h4,
              HEADING_KEYS.h5,
              HEADING_KEYS.h6,
              BlockquotePlugin.key,
              CodeBlockPlugin.key,
            ],
          },
        }),
        IndentListPlugin.extend({
          inject: {
            targetPlugins: [
              ParagraphPlugin.key,
              HEADING_KEYS.h1,
              HEADING_KEYS.h2,
              HEADING_KEYS.h3,
              HEADING_KEYS.h4,
              HEADING_KEYS.h5,
              HEADING_KEYS.h6,
              BlockquotePlugin.key,
              CodeBlockPlugin.key,
            ],
          },
        }),
        LineHeightPlugin.extend({
          inject: {
            nodeProps: {
              defaultNodeValue: 1.5,
              validNodeValues: [1, 1.2, 1.5, 2, 3],
            },
            targetPlugins: [
              ParagraphPlugin.key,
              HEADING_KEYS.h1,
              HEADING_KEYS.h2,
              HEADING_KEYS.h3,
              HEADING_KEYS.h4,
              HEADING_KEYS.h5,
              HEADING_KEYS.h6,
            ],
          },
        }),

        // Functionality
        AutoformatPlugin,
        BlockSelectionPlugin.configure({
          // enabled: !!scrollSelector,
          // options: {
          //   areaOptions: {
          //     boundaries: `#${scrollSelector}`,
          //     container: `#${scrollSelector}`,
          //     selectables: [`#${scrollSelector} .slate-selectable`],
          //     selectionAreaClass: 'slate-selection-area',
          //   },
          //   enableContextMenu: false,
          // },
        }),
        DndPlugin.configure({ options: { enableScroller: true } }),
        ExitBreakPlugin,
        NodeIdPlugin.configure({ options: { idCreator } }),
        SelectOnBackspacePlugin.configure({
          options: {
            query: {
              allow: [ImagePlugin.key, HorizontalRulePlugin.key],
            },
          },
        }),
        DeletePlugin,
        SingleLinePlugin,
        SoftBreakPlugin,
        TabbablePlugin,
        TrailingBlockPlugin.configure({
          options: { type: ParagraphPlugin.key },
        }),
      ],
      value: currentAstReference.current,
    },
    [],
  );

  return a;
};
