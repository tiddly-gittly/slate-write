/* eslint-disable unicorn/no-null */
import type { TComboboxItemBase } from '@udecode/plate-combobox';
import { BaseSelection } from 'slate';
import create from 'zustand';

export interface IAutoCompletePluginContext {
  /**
   * Active id (combobox id which is opened).
   */
  activeId?: string;

  filteredItems: Record<string, TComboboxItemBase[]>;

  /**
   * Highlighted index.
   */
  highlightedIndex: number;

  /**
   * Parent element of the popper element (the one that has the scroll).
   * @default document
   */
  popperContainer?: Document | HTMLElement;

  /**
   * Range from the trigger to the cursor.
   */
  targetRange: BaseSelection | null;

  /**
   * Text after the trigger.
   */
  text?: string;
}
export interface IAutoCompletePluginStoreActions {
  reset: () => void;
  setFilteredItems: (newState: Record<string, TComboboxItemBase[]>) => void;
}

export const useAutoCompletePluginStore = create<IAutoCompletePluginContext & IAutoCompletePluginStoreActions>((set) => ({
  highlightedIndex: -1,
  targetRange: null,
  filteredItems: {},
  setFilteredItems: (newState: Record<string, TComboboxItemBase[]>) => set((state) => ({ ...state, filteredItems: { ...state.filteredItems, ...newState } })),
  reset: () =>
    set({
      activeId: undefined,
      filteredItems: {},
      highlightedIndex: -1,
      popperContainer: undefined,
      targetRange: null,
      text: undefined,
    }),
}));
