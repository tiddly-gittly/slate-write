/* eslint-disable @typescript-eslint/consistent-type-assertions */
/**
 * Modified from plate's packages/nodes/mention/src/getMentionOnSelectItem.ts
 */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Data, NoData, TComboboxItem, TComboboxItemBase } from '@udecode/plate-combobox';
import { getPlugin, PlateEditor, PlatePluginKey } from '@udecode/plate-core';
import { deleteText, insertNodes, insertText, isEndPoint, TNodeProps, TText, Value, withoutNormalizing } from '@udecode/slate';
import { getBlockAbove } from '@udecode/slate-utils';
import { replaceCurrentBlockWithParseResult } from '../advancedBlock/replaceCurrentBlockWithParseResult';
import { ELEMENT_AUTO_COMPLETE } from '../autoComplete/createAutoCompletePlugin';
import { removeAutoCompleteInputFromCurrentSelection } from '../autoComplete/transforms';
import { AutoCompletePlugin, TAutoCompleteElement } from '../autoComplete/types';
import { ComboboxOnSelectItem } from './Combobox.types';
import { useAutoCompletePluginStore } from './store';

export type CreateAutoCompleteNode<TData extends Data> = (item: TComboboxItem<TData>) => TNodeProps<TAutoCompleteElement> | TText;

export const getAutoCompleteOnSelectItem =
  <TData extends Data = NoData>({ key = ELEMENT_AUTO_COMPLETE }: PlatePluginKey = {}): ComboboxOnSelectItem<TData> => (editor, item: TComboboxItemBase) => {
    const { targetRange, reset } = useAutoCompletePluginStore.getState();
    if (!targetRange) return;

    const {
      type,
      options: { createAutoCompleteNode, textToInsertAfter },
    } = getPlugin<AutoCompletePlugin>(editor as PlateEditor<Value>, key);

    const pathAbove = getBlockAbove(editor)?.[1];
    const isBlockEnd = editor.selection && pathAbove && isEndPoint(editor, editor.selection.anchor, pathAbove);

    withoutNormalizing(editor, () => {
      const props = createAutoCompleteNode?.(item);
      // insert a space to fix the bug
      if (isBlockEnd) {
        insertText(editor, ' ');
      }

      // disabled because it is selecting a char before the ELEMENT_AUTO_COMPLETE_INPUT block, causing removeNodes can't find the node
      // select(editor, targetRange);

      removeAutoCompleteInputFromCurrentSelection(editor);

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
      // moveSelection(editor, { unit: 'offset' });

      // delete the inserted space
      if (isBlockEnd) {
        deleteText(editor);
      }

      replaceCurrentBlockWithParseResult(editor);
    });
    reset();
  };
