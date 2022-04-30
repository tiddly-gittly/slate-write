import { ELEMENT_LINK, LinkPlugin } from '@udecode/plate';
import { getAbove, getPluginType, isCollapsed, PlateEditor, unwrapNodes } from '@udecode/plate-core';
import { Editor } from 'slate';
import { upsertLinkAtSelection } from './upsertLinkAtSelection';

export const getAndUpsertLink = async <T = {}>(editor: PlateEditor<T>, getLinkUrl?: (prevUrl: string | null) => Promise<string | null> | string | null) => {
  const type = getPluginType(editor, ELEMENT_LINK);
  let prevUrl = '';
  const selectedText = editor.selection === null ? '' : Editor.string(editor, editor.selection);

  const linkNode = getAbove(editor, {
    match: { type },
  });
  if (linkNode) {
    prevUrl = linkNode[0].url as string;
  }

  let url: string | null = null;
  if (getLinkUrl) {
    url = await getLinkUrl(prevUrl);
  } else {
    url = window.prompt(`Enter the URL of the link:`, prevUrl || selectedText);
  }
  // if canceled
  if (url === null) return;

  // remove the url
  if (url === '' && editor.selection) {
    return unwrapNodes(editor, {
      at: editor.selection,
      match: { type: getPluginType(editor, ELEMENT_LINK) },
    });
  }

  // If our cursor is in middle of a link, then we don't want to insert it inline
  const shouldWrap: boolean = linkNode !== undefined && isCollapsed(editor.selection);
  // we fork this to add `'tw-type': 'link'`
  upsertLinkAtSelection(editor, { url, wrap: shouldWrap });
};