/* eslint-disable unicorn/no-null */
import type { TComboboxItemBase, TComboboxItemWithData } from '@udecode/plate-combobox';
import { createStore } from '@udecode/plate-core';
import { BaseSelection } from 'slate';

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

export const useAutoCompletePluginStore = createStore('combo-box')<IAutoCompletePluginContext>({
  highlightedIndex: -1,
  targetRange: null,
  filteredItems: {},
}).extendActions((set) => ({
  setFilteredItems: (newState: Record<string, AnyComboBoxItem[]>) => {
    set.state((state) => ({ ...state, filteredItems: { ...state.filteredItems, ...newState } }));
  },
  reset: () => {
    set.state((state) => ({
      ...state,
      activeId: undefined,
      filteredItems: {},
      highlightedIndex: -1,
      popperContainer: undefined,
      targetRange: null,
      text: undefined,
    }));
  },
}));
