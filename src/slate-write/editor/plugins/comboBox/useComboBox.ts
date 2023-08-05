/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useCombobox } from 'downshift';
import { useMemo } from 'react';
import { useAutoCompletePluginStore } from './store';

export function useComboBox(filteredItems: unknown[]) {
  const activeId = useAutoCompletePluginStore.get.activeId?.();
  const highlightedIndex = useAutoCompletePluginStore.get.highlightedIndex?.();
  const isOpen = activeId !== undefined;

  const { closeMenu, getMenuProps, getComboboxProps, getInputProps, getItemProps } = useCombobox({
    isOpen,
    highlightedIndex,
    items: filteredItems,
    circularNavigation: true,
  });
  getMenuProps({}, { suppressRefError: true });
  getComboboxProps({}, { suppressRefError: true });
  getInputProps({}, { suppressRefError: true });

  return useMemo(
    () => ({
      closeMenu,
      getMenuProps,
      getItemProps,
    }),
    [closeMenu, getItemProps, getMenuProps],
  );
}
