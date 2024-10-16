/** File copied from `docs/src/live/config/autoformat/autoformatUtils.ts` because it's not exported
 * Not modified, can be overwrite if source updated
 */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutoformatBlockRule } from '@udecode/plate-autoformat';
import { CodeBlockPlugin, CodeLinePlugin } from '@udecode/plate-code-block/react';
import { SlateEditor } from '@udecode/plate-core';
import { toggleList, unwrapList } from '@udecode/plate-list';
import { isType } from '@udecode/plate-utils';
import { getParentNode, isElement } from '@udecode/slate';

export const preFormat: AutoformatBlockRule['preFormat'] = (editor) => {
  unwrapList(editor);
};

export const format = (editor: SlateEditor, customFormatting: CallableFunction) => {
  if (editor.selection) {
    const parentEntry = getParentNode(editor, editor.selection);

    if (!parentEntry) return;

    const [node] = parentEntry;

    if (
      isElement(node) &&
      !isType(editor, node, CodeBlockPlugin.key) &&
      !isType(editor, node, CodeLinePlugin.key)
    ) {
      customFormatting();
    }
  }
};

export const formatList = (editor: SlateEditor, elementType: string) => {
  format(editor, () =>
    toggleList(editor, {
      type: elementType,
    }));
};
