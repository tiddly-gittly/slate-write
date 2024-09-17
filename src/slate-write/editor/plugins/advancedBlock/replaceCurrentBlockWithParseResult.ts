/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { SlateEditor } from '@udecode/plate-core';
import { getNode, insertNodes } from '@udecode/slate';
import { getRangeFromBlockStart } from '@udecode/slate-utils';
import { deserialize, serialize } from 'src/slate-write/transform/serialize';

export function replaceCurrentBlockWithParseResult(editor: SlateEditor): void {
  const blockRange = getRangeFromBlockStart(editor);
  if (blockRange === undefined) return;
  // path.slice is like `[6, 0]`, but we only need `[6]` which means block level node
  const currentBlockNode = getNode(editor, blockRange.anchor.path.slice(undefined, -1));
  if (!currentBlockNode) return;
  const currentNodeText = serialize(currentBlockNode);
  if (currentNodeText) {
    const newSlateNode = deserialize(currentNodeText);
    insertNodes(editor, newSlateNode, { at: blockRange.anchor.path });
  }
}
