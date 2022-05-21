import type { TComboboxItemBase } from '@udecode/plate-combobox';
import { getNextWrappingIndex } from '@udecode/plate-combobox';
import { KeyboardHandlerReturnType, PlateEditor, Value } from '@udecode/plate-core';
import { getAutoCompleteOnSelectItem } from './getAutoCompleteOnSelectItem';
import { useAutoCompletePluginStore } from './store';

/**
 * If the combobox is open, handle:
 * - down (next item)
 * - up (previous item)
 * - escape (reset combobox)
 * - tab, enter (select item)
 */
export const onKeyDownCombobox =
  <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E): KeyboardHandlerReturnType =>
  (event) => {
    const { highlightedIndex, filteredItems, activeId } = useAutoCompletePluginStore.getState();
    const currentFilteredItems: TComboboxItemBase[] = filteredItems[activeId ?? ''] ?? [];
    const isOpen = activeId !== undefined;

    if (!isOpen) return;

    const onSelectItem = getAutoCompleteOnSelectItem({
      key: activeId,
    });

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      const newIndex = getNextWrappingIndex(1, highlightedIndex, currentFilteredItems.length, () => {}, true);
      useAutoCompletePluginStore.setState({ highlightedIndex: newIndex });
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();

      const newIndex = getNextWrappingIndex(-1, highlightedIndex, currentFilteredItems.length, () => {}, true);
      useAutoCompletePluginStore.setState({ highlightedIndex: newIndex });
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      useAutoCompletePluginStore.getState().reset();
      return;
    }

    if (['Tab', 'Enter'].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      const selectedItem = currentFilteredItems[highlightedIndex];
      if (selectedItem !== undefined) {
        onSelectItem?.(editor, selectedItem);
      }
    }
  };
