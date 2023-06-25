/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { EElementOrText, getNode, getRangeFromBlockStart, insertNodes, PlateEditor, TNode, Value } from '@udecode/plate-core';
import { deserialize, serialize } from 'src/slate-write/transform/serialize';

export function replaceCurrentBlockWithParseResult<V extends Value>(editor: PlateEditor<V>): void {
  const blockRange = getRangeFromBlockStart(editor);
  if (blockRange === undefined) return;
  // path.slice is like `[6, 0]`, but we only need `[6]` which means block level node
  const currentBlockNode = getNode(editor, blockRange.anchor.path.slice(undefined, -1));
  if (!currentBlockNode) return;
  const currentNodeText = serialize(currentBlockNode as TNode[]);
  if (currentNodeText) {
    const newSlateNode = deserialize(currentNodeText);
    insertNodes(editor, newSlateNode as Array<EElementOrText<V>>, { at: blockRange.anchor.path });
  }
}
