/* eslint-disable @typescript-eslint/explicit-function-return-type */
import shallow from 'zustand/shallow';
import { useMemo } from 'react';
import { useCombobox } from 'downshift';
import { useAutoCompletePluginStore } from './store';

export function useComboBox(filteredItems: unknown[]) {
  const { highlightedIndex, isOpen } = useAutoCompletePluginStore(
    ({ highlightedIndex, activeId }) => ({
      highlightedIndex,
      isOpen: activeId !== undefined,
    }),
    shallow,
  );

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
