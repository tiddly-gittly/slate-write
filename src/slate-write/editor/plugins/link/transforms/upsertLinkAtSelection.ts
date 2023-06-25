/** copied from plate's packages/nodes/link/src/transforms/upsertLinkAtSelection.ts , add tw-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { collapseSelection, getLeafNode, getPluginType, insertNodes, isCollapsed, PlateEditor, select, unwrapNodes, Value } from '@udecode/plate-core';
import { ELEMENT_LINK, TLinkElement } from '@udecode/plate-link';
import { wrapLink } from './wrapLink';

/**
 * Unwrap link at a location (default: selection).
 * Then, the focus of the location is set to selection focus.
 * Then, wrap the link at the location.
 */
export const upsertLinkAtSelection = <V extends Value>(
  editor: PlateEditor<V>,
  {
    url,
    wrap,
  }: {
    url: string;
    /**
     * If true, wrap the link at the location (default: selection) even if the selection is collapsed.
     */
    wrap?: boolean;
  },
): void => {
  if (!editor.selection) return;

  const type = getPluginType(editor, ELEMENT_LINK);

  if (!wrap && isCollapsed(editor.selection)) {
    insertNodes<TLinkElement>(editor, {
      type,
      url,
      children: [{ text: url }],
      // we need to change this, so fork the code
      'tw-type': 'link',
    });
    return;
  }

  // if our cursor is inside an existing link, but don't have the text selected, select it now
  if (wrap && isCollapsed(editor.selection)) {
    const linkLeaf = getLeafNode(editor, editor.selection);
    const [, inlinePath] = linkLeaf;
    select(editor, inlinePath);
  }

  unwrapNodes(editor, { at: editor.selection, match: { type } });
  // we fork this to add `'tw-type': 'link'`
  wrapLink(editor, { at: editor.selection, url });

  collapseSelection(editor, { edge: 'end' });
};
