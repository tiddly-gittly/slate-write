import { getPlugin, insertText } from '@udecode/plate';
import type { TComboboxItemBase } from '@udecode/plate-combobox';
import { getNextWrappingIndex } from '@udecode/plate-combobox';
import { KeyboardHandlerReturnType, PlateEditor, Value } from '@udecode/plate-core';
import { AutoCompletePlugin } from '../autoComplete';
import { removeAutoCompleteInputFromCurrentSelection } from '../autoComplete/transforms';
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
    const { highlightedIndex, filteredItems, activeId, reset } = useAutoCompletePluginStore.getState();
    const currentFilteredItems: TComboboxItemBase[] = filteredItems[activeId ?? ''] ?? [];
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
      removeAutoCompleteInputFromCurrentSelection(editor);
      if (keepTrigger !== true) {
        insertText(editor, trigger ?? '');
      }
      reset();
      return;
    }

    if (['Tab', 'Enter'].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      const selectedItem = currentFilteredItems[highlightedIndex];
      // if item selected, insert it
      if (selectedItem !== undefined) {
        onSelectItem?.(editor, selectedItem);
      }
    }
  };
