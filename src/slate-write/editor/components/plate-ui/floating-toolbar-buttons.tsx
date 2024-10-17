/** Copy from plate/apps/www/src/components/plate-ui/playground-floating-toolbar-buttons.tsx */
import React from 'react';

import { BoldPlugin, CodePlugin, ItalicPlugin, StrikethroughPlugin, UnderlinePlugin } from '@udecode/plate-basic-marks/react';
import { useEditorReadOnly } from '@udecode/plate-common/react';

import { Icons } from 'src/slate-write/editor/components/icons';
import { LinkToolbarButton } from 'src/slate-write/editor/components/plate-ui/link-toolbar-button';
import { ListToolbarButton } from 'src/slate-write/editor/components/plate-ui/list-toolbar-button';
import { MarkToolbarButton } from 'src/slate-write/editor/components/plate-ui/mark-toolbar-button';
import { ToolbarSeparator } from 'src/slate-write/editor/components/plate-ui/toolbar';

import { MoreDropdownMenu } from './more-dropdown-menu';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <>
          <TurnIntoDropdownMenu />

          <MarkToolbarButton nodeType={BoldPlugin.key} tooltip='Bold (⌘+B)'>
            <Icons.bold />
          </MarkToolbarButton>

          <MarkToolbarButton
            nodeType={ItalicPlugin.key}
            tooltip='Italic (⌘+I)'
          >
            <Icons.italic />
          </MarkToolbarButton>

          <MarkToolbarButton
            nodeType={UnderlinePlugin.key}
            tooltip='Underline (⌘+U)'
          >
            <Icons.underline />
          </MarkToolbarButton>

          <MarkToolbarButton
            nodeType={StrikethroughPlugin.key}
            tooltip='Strikethrough (⌘+⇧+M)'
          >
            <Icons.strikethrough />
          </MarkToolbarButton>

          <MarkToolbarButton nodeType={CodePlugin.key} tooltip='Code (⌘+E)'>
            <Icons.code />
          </MarkToolbarButton>

          <ToolbarSeparator />

          <LinkToolbarButton />
          <ListToolbarButton />
        </>
      )}

      {!readOnly && <MoreDropdownMenu />}
    </>
  );
}
