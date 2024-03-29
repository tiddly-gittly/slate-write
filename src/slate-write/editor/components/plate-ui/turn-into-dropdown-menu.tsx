import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';

import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import { Paragraph } from '@styled-icons/boxicons-regular';
import { FormatQuote, Looks3, Looks4, Looks5, Looks6, LooksOne, LooksTwo } from '@styled-icons/material';
import { toggleNodeType, usePlateEditorState } from '@udecode/plate-core';
import { collapseSelection, findNode, isCollapsed, TElement } from '@udecode/slate';
import { focusEditor } from '@udecode/slate-react';
import { BaseEditor, BaseElement, isBlock } from 'slate';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, useOpenState } from './dropdown-menu';
import { ToolbarButton } from './toolbar';

const items = [
  {
    value: ELEMENT_PARAGRAPH,
    label: 'Paragraph',
    description: 'Paragraph',
    icon: Paragraph,
  },
  {
    value: ELEMENT_H1,
    label: 'Heading 1',
    description: 'Heading 1',
    icon: LooksOne,
  },
  {
    value: ELEMENT_H2,
    label: 'Heading 2',
    description: 'Heading 2',
    icon: LooksTwo,
  },
  {
    value: ELEMENT_H3,
    label: 'Heading 3',
    description: 'Heading 3',
    icon: Looks3,
  },
  {
    value: ELEMENT_H4,
    label: 'Heading 4',
    description: 'Heading 4',
    icon: Looks4,
  },
  {
    value: ELEMENT_H5,
    label: 'Heading 5',
    description: 'Heading 5',
    icon: Looks5,
  },
  {
    value: ELEMENT_H6,
    label: 'Heading 6',
    description: 'Heading 6',
    icon: Looks6,
  },
  {
    value: ELEMENT_BLOCKQUOTE,
    label: 'Quote',
    description: 'Quote (⌘+⇧+.)',
    icon: FormatQuote,
  },
];

const defaultItem = items.find((item) => item.value === ELEMENT_PARAGRAPH)!;

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const editor = usePlateEditorState();
  const openState = useOpenState();

  let value: string = ELEMENT_PARAGRAPH;
  if (isCollapsed(editor?.selection)) {
    const entry = findNode<TElement>(editor, {
      match: (n) => isBlock(editor as BaseEditor, n as BaseElement),
    });
    if (entry !== undefined) {
      value = items.find((item) => item.value === entry[0].type)?.value ??
        ELEMENT_PARAGRAPH;
    }
  }

  const selectedItem = items.find((item) => item.value === value) ?? defaultItem;
  const { icon: SelectedItemIcon, label: selectedItemLabel } = selectedItem;

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip='Turn into'
          isDropdown
          className='lg:min-w-[130px]'
        >
          <SelectedItemIcon className='h-5 w-5 lg:hidden' />
          <span className='max-lg:hidden'>{selectedItemLabel}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='min-w-0 z-200'>
        <DropdownMenuLabel>Turn into</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          className='flex flex-col gap-0.5'
          value={value}
          onValueChange={(type) => {
            toggleNodeType(editor, { activeType: type });

            collapseSelection(editor);
            focusEditor(editor);
          }}
        >
          {items.map(({ value: itemValue, label, icon: Icon }) => (
            <DropdownMenuRadioItem
              key={itemValue}
              value={itemValue}
              className='min-w-[180px]'
            >
              <Icon className='mr-2 h-5 w-5' />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
