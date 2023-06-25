/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { CodeBlockInsertOptions } from '@udecode/plate-code-block';
import { ELEMENT_DEFAULT, getPluginType, PlateEditor } from '@udecode/plate-core';
import { getPath, isExpanded, type Value } from '@udecode/slate';
import { insertElements, isBlockAboveEmpty } from '@udecode/slate-utils';
import { Path } from 'slate';
import { insertCodeBlock } from './insertCodeBlock';

/**
 * Called by toolbars to make sure a code-block gets inserted below a paragraph
 * rather than awkwardly splitting the current selection.
 */
export const insertEmptyCodeBlock = <V extends Value>(
  editor: PlateEditor<V>,
  { defaultType = getPluginType(editor, ELEMENT_DEFAULT), insertNodesOptions, level = 0 }: CodeBlockInsertOptions<V>,
) => {
  if (!editor.selection) return;

  if (isExpanded(editor.selection) || !isBlockAboveEmpty(editor)) {
    const selectionPath = getPath(editor, editor.selection);
    const insertPath = Path.next(selectionPath.slice(0, level + 1));
    insertElements(
      editor,
      { type: defaultType, children: [{ text: '' }] },
      {
        at: insertPath,
        select: true,
      },
    );
  }
  insertCodeBlock(editor, insertNodesOptions);
};
