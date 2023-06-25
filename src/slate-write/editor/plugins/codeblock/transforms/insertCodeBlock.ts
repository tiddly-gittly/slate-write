/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getPluginType, PlateEditor } from '@udecode/plate-core';
import { InsertNodesOptions, isExpanded, setElements, someNode, TElement, Value, wrapNodes } from '@udecode/slate';
import { isSelectionAtBlockStart } from '@udecode/slate-utils';
import { ELEMENT_CODE_BLOCK } from '../constants';
import { getCodeLineType } from '../options';

/**
 * Insert a code block: set the node to code line and wrap it with a code block.
 * If the cursor is not at the block start, insert break before.
 */
export const insertCodeBlock = <V extends Value>(editor: PlateEditor<V>, insertNodesOptions: Omit<InsertNodesOptions<V>, 'match'> = {}) => {
  if (!editor.selection || isExpanded(editor.selection)) return;

  const matchCodeElements = (node: TElement) => node.type === getPluginType(editor, ELEMENT_CODE_BLOCK) || node.type === getCodeLineType(editor);

  if (
    someNode(editor, {
      match: matchCodeElements,
    })
  ) {
    return;
  }

  if (!isSelectionAtBlockStart(editor)) {
    editor.insertBreak();
  }

  setElements(
    editor,
    {
      type: getCodeLineType(editor),
      children: [{ text: '' }],
    },
    insertNodesOptions,
  );

  wrapNodes<TElement>(
    editor,
    {
      type: getPluginType(editor, ELEMENT_CODE_BLOCK),
      children: [],
    },
    insertNodesOptions,
  );
};
