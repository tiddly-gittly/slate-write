/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import { Bracket } from '@styled-icons/boxicons-regular/Bracket';
import { CodeAlt } from '@styled-icons/boxicons-regular/CodeAlt';
import { Subscript } from '@styled-icons/foundation/Subscript';
import { Superscript } from '@styled-icons/foundation/Superscript';
import { FormatBold } from '@styled-icons/material/FormatBold';
import { FormatItalic } from '@styled-icons/material/FormatItalic';
import { FormatStrikethrough } from '@styled-icons/material/FormatStrikethrough';
import { FormatUnderlined } from '@styled-icons/material/FormatUnderlined';
import { Link } from '@styled-icons/material/Link';
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_SUBSCRIPT, MARK_SUPERSCRIPT, MARK_UNDERLINE } from '@udecode/plate-basic-marks';
import { ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';

import { getPluginType, usePlateEditorRef, usePlateReadOnly } from '@udecode/plate-core';
import { BaseEditor, Editor } from 'slate';
import type { Placement } from 'tippy.js';
import { LinkToolbarButton } from '../plugins/link/LinkToolbarButton';
import { ListToolbarButton } from './plate-ui/list-toolbar-button';
import { MarkToolbarButton } from './plate-ui/mark-toolbar-button';
import { MoreDropdownMenu } from './plate-ui/more-dropdown-menu';
import { TurnIntoDropdownMenu } from './plate-ui/turn-into-dropdown-menu';

const tooltipStyle = {
  arrow: true,
  delay: 0,
  duration: [200, 0] as [number, number],
  hideOnClick: false,
  offset: [0, 17] as [number, number],
  placement: 'top' as Placement,
};

export const BasicElementToolbarButtons = (): JSX.Element => {
  const editor = usePlateEditorRef();

  return (
    <>
      <LinkToolbarButton tooltip='Link to (Ctrl+L) ([[)'>
        <Link />
      </LinkToolbarButton>
      <LinkToolbarButton
        getLinkUrl={(previousUrl: string | null) => (editor.selection === null ? previousUrl ?? '' : Editor.string(editor as BaseEditor, editor.selection))}
        tooltip='WikiLink ([[)'
      >
        <Bracket />
      </LinkToolbarButton>
      {/* <TableToolbarButtons /> */}
    </>
  );
};

// export const TableToolbarButtons = (): JSX.Element => (
//   <>
//     <TableToolbarButton icon={<BorderAll />} transform={insertTable} />
//     <TableToolbarButton icon={<BorderClear />} transform={deleteTable} />
//     <TableToolbarButton icon={<BorderBottom />} transform={insertTableRow} />
//     <TableToolbarButton icon={<BorderTop />} transform={deleteRow} />
//     <TableToolbarButton icon={<BorderLeft />} transform={insertTableColumn} />
//     <TableToolbarButton icon={<BorderRight />} transform={deleteColumn} />
//   </>
// );

export const ListToolbarButtons = (): JSX.Element => {
  return (
    <>
      <ListToolbarButton
        nodeType={ELEMENT_UL}
      />
      <ListToolbarButton
        nodeType={ELEMENT_OL}
      />
    </>
  );
};

export const BasicMarkToolbarButtons = (): JSX.Element => {
  const editor = usePlateEditorRef()!;

  return (
    <>
      <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (⌘B) ('')">
        <FormatBold />
      </MarkToolbarButton>
      <MarkToolbarButton nodeType={MARK_ITALIC} tooltip='Italic (⌘I) (//)'>
        <FormatItalic />
      </MarkToolbarButton>
      <MarkToolbarButton
        nodeType={MARK_UNDERLINE}
        tooltip='Underline (⌘U) (__)'
      >
        <FormatUnderlined />
      </MarkToolbarButton>
      <MarkToolbarButton
        nodeType={MARK_STRIKETHROUGH}
        tooltip='Delete (~~)'
      >
        <FormatStrikethrough />
      </MarkToolbarButton>
      <MarkToolbarButton nodeType={MARK_CODE} tooltip='Code (```)'>
        <CodeAlt />
      </MarkToolbarButton>
      <MarkToolbarButton
        nodeType={MARK_SUPERSCRIPT}
        clear={getPluginType(editor, MARK_SUBSCRIPT)}
        tooltip='SuperScript (^^)'
      >
        <Superscript />
      </MarkToolbarButton>
      <MarkToolbarButton
        nodeType={MARK_SUBSCRIPT}
        clear={getPluginType(editor, MARK_SUPERSCRIPT)}
        tooltip='SubScript (,,)'
      >
        <Subscript />
      </MarkToolbarButton>
    </>
  );
};

export const FloatingToolbarButtons = (): JSX.Element | null => {
  const theme = 'light';
  const readOnly = usePlateReadOnly();
  if (readOnly) return null;

  return (
    <>
      <TurnIntoDropdownMenu />
      <BasicMarkToolbarButtons />
      <BasicElementToolbarButtons />
      <ListToolbarButtons />
      <MoreDropdownMenu />
    </>
  );
};
