
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { MARK_SUBSCRIPT, MARK_SUPERSCRIPT } from '@udecode/plate-basic-marks';

import { More } from '@styled-icons/material/More';
import { Subscript } from '@styled-icons/material/Subscript';
import { Superscript } from '@styled-icons/material/Superscript';
import { usePlateEditorState } from '@udecode/plate-core';
import { focusEditor } from '@udecode/slate-react';
import { toggleMark } from '@udecode/slate-utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, useOpenState } from './dropdown-menu';
import { ToolbarButton } from './toolbar';

export function MoreDropdownMenu(props: DropdownMenuProps) {
  const editor = usePlateEditorState();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip='Insert'>
          <More />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='start'
        className='flex max-h-[500px] min-w-[180px] flex-col gap-0.5 overflow-y-auto'
      >
        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_SUBSCRIPT,
              clear: MARK_SUPERSCRIPT,
            });
            focusEditor(editor);
          }}
        >
          <Superscript className='mr-2 h-5 w-5' />
          Superscript
          {/* (⌘+,) */}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_SUPERSCRIPT,
              clear: MARK_SUBSCRIPT,
            });
            focusEditor(editor);
          }}
        >
          <Subscript className='mr-2 h-5 w-5' />
          Subscript
          {/* (⌘+.) */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
