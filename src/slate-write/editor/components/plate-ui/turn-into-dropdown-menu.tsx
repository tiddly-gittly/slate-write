/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/** Copy from plate/apps/www/src/components/plate-ui/playground-turn-into-dropdown-menu.tsx */

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { getNodeEntries, isBlock, setNodes, type TElement, unsetNodes } from '@udecode/plate-common';
import { focusEditor, ParagraphPlugin, useEditorRef, useEditorSelector } from '@udecode/plate-common/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { ListStyleType, toggleIndentList } from '@udecode/plate-indent-list';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import { unwrapList } from '@udecode/plate-list';
import { ListPlugin } from '@udecode/plate-list/react';

import { Icons } from 'src/slate-write/editor/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from 'src/slate-write/editor/components/plate-ui/dropdown-menu';
import { ToolbarButton } from 'src/slate-write/editor/components/plate-ui/toolbar';

const items = [
  {
    description: 'Paragraph',
    icon: Icons.paragraph,
    label: 'Paragraph',
    plugin: HeadingPlugin,
    value: ParagraphPlugin.key,
  },
  {
    description: 'Heading 1',
    icon: Icons.h1,
    label: 'Heading 1',
    plugin: HeadingPlugin,
    value: HEADING_KEYS.h1,
  },
  {
    description: 'Heading 2',
    icon: Icons.h2,
    label: 'Heading 2',
    plugin: HeadingPlugin,
    value: HEADING_KEYS.h2,
  },
  {
    description: 'Heading 3',
    icon: Icons.h3,
    label: 'Heading 3',
    plugin: HeadingPlugin,
    value: HEADING_KEYS.h3,
  },
  {
    description: 'Bulleted list',
    icon: Icons.ul,
    label: 'Bulleted list',
    plugin: ListPlugin,
    value: 'ul',
  },
  {
    description: 'Numbered list',
    icon: Icons.ol,
    label: 'Numbered list',
    plugin: ListPlugin,
    value: 'ol',
  },
  {
    description: 'Bulleted list',
    icon: Icons.ul,
    label: 'Bulleted list',
    plugin: IndentListPlugin,
    value: ListStyleType.Disc,
  },
  {
    description: 'Numbered list',
    icon: Icons.ol,
    label: 'Numbered list',
    plugin: IndentListPlugin,
    value: ListStyleType.Decimal,
  },
  {
    description: 'Quote (⌘+⇧+.)',
    icon: Icons.blockquote,
    label: 'Quote',
    plugin: BlockquotePlugin,
    value: BlockquotePlugin.key,
  },
];

const defaultItem = items.find((item) => item.value === ParagraphPlugin.key)!;

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const value: string = useEditorSelector((editor) => {
    let initialNodeType: string = ParagraphPlugin.key;
    let allNodesMatchInitialNodeType = false;
    const codeBlockEntries = getNodeEntries(editor, {
      match: (n) => isBlock(editor, n),
      mode: 'highest',
    });
    const nodes = [...codeBlockEntries];

    if (nodes.length > 0) {
      initialNodeType = nodes[0][0].type as string;
      allNodesMatchInitialNodeType = nodes.every(([node]) => {
        const type: string = (node?.type as string) || ParagraphPlugin.key;

        return type === initialNodeType;
      });
    }

    return allNodesMatchInitialNodeType ? initialNodeType : ParagraphPlugin.key;
  }, []);

  const editor = useEditorRef();
  const openState = useOpenState();

  const selectedItem = items.find((item) => item.value === value) ?? defaultItem;
  const { icon: SelectedItemIcon, label: selectedItemLabel } = selectedItem;

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          className='lg:min-w-[130px]'
          pressed={openState.open}
          tooltip='Turn into'
          isDropdown
        >
          <SelectedItemIcon className='size-5 lg:hidden' />
          <span className='max-lg:hidden'>{selectedItemLabel}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='ignore-click-outside/toolbar min-w-0'
        align='start'
      >
        <DropdownMenuLabel>Turn into</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          className='flex flex-col gap-0.5'
          value={value}
          onValueChange={(type: unknown) => {
            if (type === ListStyleType.Disc || type === ListStyleType.Decimal) {
              setNodes(editor, { type: 'p' });
              toggleIndentList(editor, {
                listStyleType: type,
              });
            } else if (type === 'ul' || type === 'ol') {
              editor.tf.toggle.list({ type });
            } else if (typeof type === 'string' || type === undefined) {
              unwrapList(editor);
              unsetNodes<TElement>(editor, ['indent', 'listStyleType']);
              editor.tf.toggle.block({ type });
            }

            focusEditor(editor);
          }}
        >
          {items.map(({ icon: Icon, label, plugin, value: itemValue }) => (
            <DropdownMenuRadioItem
              key={plugin.key}
              className='min-w-[180px]'
              value={itemValue}
            >
              <Icon className='mr-2 size-5' />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
