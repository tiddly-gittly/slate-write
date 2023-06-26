/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { PlateEditor } from '@udecode/plate-core';
import { getNode, insertText, removeNodes, TEditor, THistoryEditor, unwrapNodes, Value, withoutMergingHistory, withoutNormalizing } from '@udecode/slate';
import { Path } from 'slate';
import { ELEMENT_AUTO_COMPLETE_INPUT } from '../createAutoCompletePlugin';
import { TAutoCompleteInputElement } from '../types';

export const removeAutoCompleteInputAtPath = <V extends Value>(editor: PlateEditor<V>, path: Path) =>
  withoutNormalizing(editor, () => {
    const node = getNode<TAutoCompleteInputElement>(editor, path);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!node) return;

    const { trigger } = node;

    insertText(editor, trigger, {
      at: { path: [...path, 0], offset: 0 },
    });
    unwrapNodes(editor, {
      at: path,
    });
  });
export const removeAutoCompleteInputFromCurrentSelection = <V extends Value>(editor: PlateEditor<V>) => {
  withoutMergingHistory(editor as THistoryEditor<V>, () => {
    removeNodes(editor as TEditor<V>, {
      match: (node) => node.type === ELEMENT_AUTO_COMPLETE_INPUT,
    });
  });
};
