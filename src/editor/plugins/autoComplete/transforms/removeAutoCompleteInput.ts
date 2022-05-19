/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getNode, insertText, PlateEditor, unwrapNodes, Value, withoutNormalizing } from '@udecode/plate-core';
import { Path } from 'slate';
import { TAutoCompleteInputElement } from '../types';

export const removeAutoCompleteInput = <V extends Value>(editor: PlateEditor<V>, path: Path) =>
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
