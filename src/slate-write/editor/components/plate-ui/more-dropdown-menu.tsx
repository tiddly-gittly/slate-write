/** Copy from plate/apps/www/src/components/plate-ui/playground-more-dropdown-menu.tsx */


import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { SubscriptPlugin, SuperscriptPlugin } from '@udecode/plate-basic-marks/react';
import { collapseSelection } from '@udecode/plate-common';
import { focusEditor, useEditorRef } from '@udecode/plate-common/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';

import { Icons } from 'src/slate-write/editor/components/icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, useOpenState } from 'src/slate-write/editor/components/plate-ui/dropdown-menu';
import { ToolbarButton } from 'src/slate-write/editor/components/plate-ui/toolbar';

export function MoreDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip='Insert'>
          <Icons.more />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='ignore-click-outside/toolbar flex max-h-[500px] min-w-[180px] flex-col gap-0.5 overflow-y-auto'
        align='start'
      >
        <DropdownMenuItem
          onSelect={() => {
            editor.tf.toggle.mark({ key: KbdPlugin.key });
            collapseSelection(editor, { edge: 'end' });
            focusEditor(editor);
          }}
        >
          <Icons.kbd className='mr-2 size-5' />
          Keyboard input
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            editor.tf.toggle.mark({
              key: SuperscriptPlugin.key,
              clear: [SubscriptPlugin.key, SuperscriptPlugin.key],
            });
            focusEditor(editor);
          }}
        >
          <Icons.superscript className='mr-2 size-5' />
          Superscript
          {/* (⌘+,) */}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            editor.tf.toggle.mark({
              key: SubscriptPlugin.key,
              clear: [SuperscriptPlugin.key, SubscriptPlugin.key],
            });
            focusEditor(editor);
          }}
        >
          <Icons.subscript className='mr-2 size-5' />
          Subscript
          {/* (⌘+.) */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
