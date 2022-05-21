import { ComboboxState, ComboboxStateById, ComboboxStoreById, NoData, TComboboxItem } from '@udecode/plate-combobox';
import { RenderFunction } from '@udecode/plate-core';
import { StyledProps } from '@udecode/plate-styled-components';
import { CSSProp } from 'styled-components';

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

export interface ComboboxProps<TData = NoData> extends Partial<Pick<ComboboxState<TData>, 'items'>>, ComboboxStateById<TData>, StyledProps<ComboboxStyles> {
  /**
   * Render combobox item.
   * @default text
   */
  onRenderItem?: RenderFunction<ComboboxItemProps<TData>>;
}
