import type { TComboboxItemBase } from '@udecode/plate-combobox';
import { getNextWrappingIndex } from '@udecode/plate-combobox';
import { getPlugin, KeyboardHandlerReturnType, PlateEditor } from '@udecode/plate-core';
import { insertText, Value } from '@udecode/slate';

import { removeAutoCompleteInputFromCurrentSelection } from '../autoComplete/transforms/removeAutoCompleteInput';
import { AutoCompletePlugin } from '../autoComplete/types';
import { getAutoCompleteOnSelectItem } from './getAutoCompleteOnSelectItem';
import { useAutoCompletePluginStore } from './store';

/**
 * If the combobox is open, handle:
 * - down (next item)
 * - up (previous item)
 * - escape (reset combobox)
 * - tab, enter (select item)
 */
export const onKeyDownCombobox = <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E): KeyboardHandlerReturnType => (event) => {
  const activeId = useAutoCompletePluginStore.get.activeId?.();
  const highlightedIndex = useAutoCompletePluginStore.get.highlightedIndex?.();
  const filteredItems = useAutoCompletePluginStore.get.filteredItems()[activeId ?? ''] ?? [];
  const isOpen = activeId !== undefined;

  if (!isOpen) return;

  const onSelectItem = getAutoCompleteOnSelectItem({
    key: activeId,
  });
  const {
    options: { keepTrigger, trigger },
  } = getPlugin<AutoCompletePlugin>(editor as PlateEditor<Value>, activeId);

  if (event.key === 'ArrowDown') {
    event.preventDefault();

    const newIndex = getNextWrappingIndex(1, highlightedIndex, filteredItems.length, () => {}, true);
    useAutoCompletePluginStore.set.highlightedIndex(newIndex);
    return;
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault();

    const newIndex = getNextWrappingIndex(-1, highlightedIndex, filteredItems.length, () => {}, true);
    useAutoCompletePluginStore.set.highlightedIndex(newIndex);
    return;
  }
  if (event.key === 'Escape') {
    event.preventDefault();
    removeAutoCompleteInputFromCurrentSelection(editor);
    // modify source to add this
    if (keepTrigger !== true) {
      insertText(editor, trigger ?? '');
    }
    useAutoCompletePluginStore.set.reset();
    return;
  }

  if (['Tab', 'Enter'].includes(event.key)) {
    event.preventDefault();
    event.stopPropagation();
    const selectedItem = filteredItems[highlightedIndex];
    // if item selected, insert it
    if (selectedItem !== undefined) {
      onSelectItem?.(editor, selectedItem);
    }
  }
};
