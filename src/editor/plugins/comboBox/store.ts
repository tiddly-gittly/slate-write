/* eslint-disable unicorn/no-null */
import { TComboboxItemWithData } from '@udecode/plate';
import type { TComboboxItemBase } from '@udecode/plate-combobox';
import { BaseSelection } from 'slate';
import create from 'zustand';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export type AnyComboBoxItem<T extends any = any> = TComboboxItemWithData<T> | TComboboxItemBase;
export interface IAutoCompletePluginContext {
  /**
   * Active id (combobox id which is opened).
   */
  activeId?: string;

  filteredItems: Record<string, AnyComboBoxItem[]>;

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
  setFilteredItems: (newState: Record<string, AnyComboBoxItem[]>) => void;
}
export type IAutoCompletePluginStore = IAutoCompletePluginContext & IAutoCompletePluginStoreActions;

export const useAutoCompletePluginStore = create<IAutoCompletePluginStore>((set) => ({
  highlightedIndex: -1,
  targetRange: null,
  filteredItems: {},
  setFilteredItems: (newState: Record<string, AnyComboBoxItem[]>) => set((state) => ({ ...state, filteredItems: { ...state.filteredItems, ...newState } })),
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
