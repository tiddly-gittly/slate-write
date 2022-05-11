/** File copied from `docs/src/live/config/autoformat/autoformatUtils.ts` because it's not exported
 * Not modified, can be overwrite if source updated
 */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AutoformatBlockRule,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  getParentNode,
  isElement,
  isType,
  PlateEditor,
  toggleList,
  unwrapList,
  Value,
} from '@udecode/plate';

export const clearBlockFormat: AutoformatBlockRule['preFormat'] = (editor) => unwrapList(editor);

export const format = <V extends Value>(editor: PlateEditor<V>, customFormatting: any) => {
  if (editor.selection) {
    const parentEntry = getParentNode(editor, editor.selection);
    if (!parentEntry) return;
    const [node] = parentEntry;
    if (isElement(node) && !isType(editor, node, ELEMENT_CODE_BLOCK) && !isType(editor, node, ELEMENT_CODE_LINE)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      customFormatting();
    }
  }
};

export const formatList = <V extends Value>(editor: PlateEditor<V>, elementType: string) => {
  format(editor, () =>
    toggleList(editor, {
      type: elementType,
    }),
  );
};

export const formatText = <V extends Value>(editor: PlateEditor<V>, text: string) => {
  format(editor, () => editor.insertText(text));
};
