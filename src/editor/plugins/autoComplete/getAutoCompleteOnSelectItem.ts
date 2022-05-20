/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { PlateEditor, TText, Value } from '@udecode/plate';
import { comboboxActions, ComboboxOnSelectItem, comboboxSelectors, Data, NoData, TComboboxItem } from '@udecode/plate-combobox';
import {
  deleteText,
  getBlockAbove,
  getPlugin,
  insertNodes,
  insertText,
  isEndPoint,
  moveSelection,
  PlatePluginKey,
  removeNodes,
  select,
  TNodeProps,
  withoutMergingHistory,
  withoutNormalizing,
} from '@udecode/plate-core';
import { ELEMENT_AUTO_COMPLETE, ELEMENT_AUTO_COMPLETE_INPUT } from './createAutoCompletePlugin';
import { AutoCompletePlugin, TAutoCompleteElement } from './types';

export type CreateAutoCompleteNode<TData extends Data> = (item: TComboboxItem<TData>) => TNodeProps<TAutoCompleteElement> | TText;

export const getAutoCompleteOnSelectItem =
  <TData extends Data = NoData>({ key = ELEMENT_AUTO_COMPLETE }: PlatePluginKey = {}): ComboboxOnSelectItem<TData> =>
  (editor, item) => {
    const targetRange = comboboxSelectors.targetRange();
    if (!targetRange) return;

    const {
      type,
      options: { createAutoCompleteNode, textToInsertAfter },
    } = getPlugin<AutoCompletePlugin>(editor as PlateEditor<Value>, key);

    const pathAbove = getBlockAbove(editor)?.[1];
    const isBlockEnd = editor.selection && pathAbove && isEndPoint(editor, editor.selection.anchor, pathAbove);

    withoutNormalizing(editor, () => {
      // insert a space to fix the bug
      if (isBlockEnd) {
        insertText(editor, ' ');
      }

      // disabled because it is selecting a char before the ELEMENT_AUTO_COMPLETE_INPUT block, causing removeNodes can't find the node
      // select(editor, targetRange);

      withoutMergingHistory(editor, () =>
        removeNodes(editor, {
          match: (node) => node.type === ELEMENT_AUTO_COMPLETE_INPUT,
        }),
      );

      const props = createAutoCompleteNode?.(item);

      // if user want to insert string, the `createAutoCompleteNode` should return a text node
      if (props?.text) {
        insertText(editor, (props as TText).text);
      } else {
        // otherwise, an element node
        insertNodes<TAutoCompleteElement>(editor, {
          type,
          children: [{ text: '' }],
          ...props,
        } as TAutoCompleteElement);
      }
      if (textToInsertAfter) {
        insertText(editor, textToInsertAfter);
      }

      // move the selection after the element
      // disabled because we don't need to move to next line
      // moveSelection(editor);

      // delete the inserted space
      if (isBlockEnd) {
        deleteText(editor);
      }
    });
    return comboboxActions.reset();
  };
