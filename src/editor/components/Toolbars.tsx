/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import React from 'react';
import { CodeAlt } from '@styled-icons/boxicons-regular/CodeAlt';
import { CodeBlock } from '@styled-icons/boxicons-regular/CodeBlock';
import { Subscript } from '@styled-icons/foundation/Subscript';
import { Superscript } from '@styled-icons/foundation/Superscript';
import { FormatBold } from '@styled-icons/material/FormatBold';
import { FormatItalic } from '@styled-icons/material/FormatItalic';
import { FormatListBulleted } from '@styled-icons/material/FormatListBulleted';
import { FormatListNumbered } from '@styled-icons/material/FormatListNumbered';
import { FormatQuote } from '@styled-icons/material/FormatQuote';
import { FormatStrikethrough } from '@styled-icons/material/FormatStrikethrough';
import { FormatUnderlined } from '@styled-icons/material/FormatUnderlined';
import { Looks3 } from '@styled-icons/material/Looks3';
import { Looks4 } from '@styled-icons/material/Looks4';
import { Looks5 } from '@styled-icons/material/Looks5';
import { Looks6 } from '@styled-icons/material/Looks6';
import { LooksOne } from '@styled-icons/material/LooksOne';
import { LooksTwo } from '@styled-icons/material/LooksTwo';
import { Link } from '@styled-icons/material/Link';
import { Bracket } from '@styled-icons/boxicons-regular/Bracket';
import {
  BalloonToolbar,
  BlockToolbarButton,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_OL,
  ELEMENT_UL,
  getPluginType,
  ListToolbarButton,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
  MarkToolbarButton,
  usePlateEditorRef,
} from '@udecode/plate';
import type { Placement } from 'tippy.js';
import { LinkToolbarButton } from '../config/plugins/link/LinkToolbarButton';
import { Editor } from 'slate';

const tooltipStyle = {
  arrow: true,
  delay: 0,
  duration: [200, 0] as [number, number],
  hideOnClick: false,
  offset: [0, 17] as [number, number],
  placement: 'top' as Placement,
};

export const BasicElementToolbarButtons = (): JSX.Element => {
  const editor = usePlateEditorRef()!;

  return (
    <>
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H1)} icon={<LooksOne />} tooltip={{ content: 'H1 (Ctrl+1) (! )', ...tooltipStyle }} />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H2)} icon={<LooksTwo />} tooltip={{ content: 'H2 (Ctrl+2) (!! )', ...tooltipStyle }} />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H3)} icon={<Looks3 />} tooltip={{ content: 'H3 (Ctrl+3) (!!! )', ...tooltipStyle }} />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H4)} icon={<Looks4 />} tooltip={{ content: 'H4 (Ctrl+4) (!!!! )', ...tooltipStyle }} />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H5)} icon={<Looks5 />} tooltip={{ content: 'H5 (Ctrl+5) (!!!!! )', ...tooltipStyle }} />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H6)} icon={<Looks6 />} tooltip={{ content: 'H6 (Ctrl+6) (!!!!!! )', ...tooltipStyle }} />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
        icon={<FormatQuote />}
        tooltip={{ content: 'Quote (Ctrl+E) (> )', ...tooltipStyle }}
      />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_CODE_BLOCK)} icon={<CodeBlock />} tooltip={{ content: 'Code (Ctrl+K) (```)', ...tooltipStyle }} />
      <LinkToolbarButton icon={<Link />} tooltip={{ content: 'Link to (Ctrl+L) ([[)', ...tooltipStyle }} />
      <LinkToolbarButton
        icon={<Bracket />}
        getLinkUrl={(prevUrl: string | null) => (editor.selection === null ? prevUrl ?? '' : Editor.string(editor, editor.selection))}
        tooltip={{ content: 'WikiLink ([[)', ...tooltipStyle }}
      />
    </>
  );
};

export const ListToolbarButtons = (): JSX.Element => {
  const editor = usePlateEditorRef()!;

  return (
    <>
      <ListToolbarButton
        type={getPluginType(editor, ELEMENT_UL)}
        icon={<FormatListBulleted />}
        tooltip={{ content: `UnorderedList (-) (*)`, ...tooltipStyle }}
      />
      <ListToolbarButton
        type={getPluginType(editor, ELEMENT_OL)}
        icon={<FormatListNumbered />}
        tooltip={{ content: `OrderedList (#) (1.)`, ...tooltipStyle }}
      />
    </>
  );
};

export const BasicMarkToolbarButtons = (): JSX.Element => {
  const editor = usePlateEditorRef()!;

  return (
    <>
      <MarkToolbarButton type={getPluginType(editor, MARK_BOLD)} icon={<FormatBold />} tooltip={{ content: `Bold (⌘B) ('')`, ...tooltipStyle }} />
      <MarkToolbarButton type={getPluginType(editor, MARK_ITALIC)} icon={<FormatItalic />} tooltip={{ content: 'Italic (⌘I) (//)', ...tooltipStyle }} />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />}
        tooltip={{ content: 'Underline (⌘U) (__)', ...tooltipStyle }}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_STRIKETHROUGH)}
        icon={<FormatStrikethrough />}
        tooltip={{ content: `Delete (~~)`, ...tooltipStyle }}
      />
      <MarkToolbarButton type={getPluginType(editor, MARK_CODE)} icon={<CodeAlt />} tooltip={{ content: 'Code (`)', ...tooltipStyle }} />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_SUPERSCRIPT)}
        clear={getPluginType(editor, MARK_SUBSCRIPT)}
        icon={<Superscript />}
        tooltip={{ content: 'SuperScript (^^)', ...tooltipStyle }}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_SUBSCRIPT)}
        clear={getPluginType(editor, MARK_SUPERSCRIPT)}
        icon={<Subscript />}
        tooltip={{ content: 'SubScript (,,)', ...tooltipStyle }}
      />
    </>
  );
};

export const BallonToolbar = (): JSX.Element => {
  const theme = 'light';

  return (
    <BalloonToolbar
      popperOptions={{
        placement: 'top',
      }}
      theme={theme}>
      <BasicMarkToolbarButtons />
      <BasicElementToolbarButtons />
      <ListToolbarButtons />
    </BalloonToolbar>
  );
};
