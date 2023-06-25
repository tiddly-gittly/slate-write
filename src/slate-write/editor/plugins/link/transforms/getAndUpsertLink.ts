/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { getAboveNode, getPluginType, isCollapsed, PlateEditor, unwrapNodes, Value } from '@udecode/plate-core';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { Editor } from 'slate';
import { upsertLinkAtSelection } from './upsertLinkAtSelection';

export const getAndUpsertLink = async <V extends Value>(
  editor: PlateEditor<V>,
  getLinkUrl?: (previousUrl: string | null) => Promise<string | null> | string | null,
) => {
  const type = getPluginType(editor, ELEMENT_LINK);
  let previousUrl = '';
  const selectedText = editor.selection === null ? '' : Editor.string(editor as Editor, editor.selection);

  const linkNode = getAboveNode(editor, {
    match: { type },
  });
  if (linkNode !== undefined) {
    previousUrl = linkNode[0].url as string;
  }

  let url: string | null = null;
  if (getLinkUrl === undefined) {
    url = window.prompt(`Enter the URL of the link:`, previousUrl || selectedText);
  } else {
    url = await getLinkUrl(previousUrl);
  }
  // if canceled
  if (url === null) return;

  // remove the url
  if (url === '' && editor.selection !== undefined && editor.selection !== null) {
    unwrapNodes(editor, {
      at: editor.selection,
      match: { type: getPluginType(editor, ELEMENT_LINK) },
    });
    return;
  }

  // If our cursor is in middle of a link, then we don't want to insert it inline
  const shouldWrap: boolean = linkNode !== undefined && isCollapsed(editor.selection);
  // we fork this to add `'tw-type': 'link'`
  upsertLinkAtSelection(editor, { url, wrap: shouldWrap });
};
