import type { ComboboxState, NoData, TComboboxItem } from '@udecode/plate-combobox';
import type { PlateEditor, RenderFunction, Value } from '@udecode/slate';
import type { StyledProps } from '@udecode/plate-styled-components';
import type { CSSProp } from 'styled-components';
import type { AnyComboBoxItem } from './store';

export interface ComboboxStyleProps<TData> extends ComboboxProps<TData> {
  highlighted?: boolean;
}

export interface ComboboxStyles {
  highlightedItem: CSSProp;
  item: CSSProp;
}

export interface ComboboxItemProps<TData> {
  item: TComboboxItem<TData>;
}

export interface WidgetsListItemTextGetters {
  getNameTemplate?: (item: AnyComboBoxItem) => string;
  getRenderTextTemplate: (item: AnyComboBoxItem) => string;
}

export type ComboboxOnSelectItem<TData> = <V extends Value>(editor: PlateEditor<V>, item: AnyComboBoxItem<TData>) => any;
interface ComboboxStateById<TData = NoData> {
  /**
   * Is opening/closing the combobox controlled by the client.
   */
  controlled?: boolean;
  /**
   * Items filter function by text.
   * @default (value) => value.text.toLowerCase().startsWith(search.toLowerCase())
   */
  filter?: (search: string) => (item: TComboboxItem<TData>) => boolean;
  /**
   * Combobox id.
   */
  id: string;
  /**
   * Max number of items.
   * @default items.length
   */
  maxSuggestions?: number;
  /**
   * Called when an item is selected.
   */
  onSelectItem: ComboboxOnSelectItem<TData> | null;
  /**
   * Regular expression for search, for example to allow whitespace
   */
  searchPattern?: string;
  /**
   * Trigger that activates the combobox.
   */
  trigger: string;
}
export interface ComboboxProps<TData = NoData> extends Partial<Pick<ComboboxState<TData>, 'items'>>, ComboboxStateById<TData>, StyledProps<ComboboxStyles> {
  /**
   * Render combobox item.
   * @default text
   */
  onRenderItem?: RenderFunction<ComboboxItemProps<TData> & WidgetsListItemTextGetters>;
}
