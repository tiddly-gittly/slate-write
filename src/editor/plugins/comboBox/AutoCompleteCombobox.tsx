import React, { useMemo } from 'react';
import type { Data, NoData } from '@udecode/plate-combobox';
import { getPluginOptions, usePlateEditorRef } from '@udecode/plate-core';
import { ELEMENT_AUTO_COMPLETE } from '../autoComplete/createAutoCompletePlugin';
import { AutoCompletePlugin } from '../autoComplete/types';
import { getAutoCompleteOnSelectItem } from './getAutoCompleteOnSelectItem';
import { Combobox } from './Combobox';
import { ComboboxProps } from './Combobox.types';

export interface AutoCompleteComboboxProps<TData extends Data = NoData> extends Partial<ComboboxProps<TData>> {
  pluginKey?: string;
}

export function AutoCompleteCombobox<TData extends Data = NoData>({
  pluginKey = ELEMENT_AUTO_COMPLETE,
  id = pluginKey,
  ...props
}: AutoCompleteComboboxProps<TData>): JSX.Element {
  const editor = usePlateEditorRef()!;

  const { trigger } = getPluginOptions<AutoCompletePlugin>(editor, pluginKey);
  const onSelectItem = useMemo(
    () =>
      getAutoCompleteOnSelectItem<TData>({
        key: pluginKey,
      }),
    [pluginKey],
  );

  return <Combobox id={id} trigger={trigger!} controlled onSelectItem={onSelectItem} {...props} />;
}
