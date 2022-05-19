import React from 'react';
import { Data, NoData } from '@udecode/plate-combobox';
import { getPluginOptions, usePlateEditorRef } from '@udecode/plate-core';
import { Combobox, ComboboxProps } from '@udecode/plate-ui-combobox';
import { ELEMENT_AUTO_COMPLETE } from './createAutoCompletePlugin';
import { AutoCompletePlugin } from './types';
import { getAutoCompleteOnSelectItem } from './getAutoCompleteOnSelectItem';

export interface AutoCompleteComboboxProps<TData extends Data = NoData> extends Partial<ComboboxProps<TData>> {
  pluginKey?: string;
}

export const AutoCompleteCombobox = <TData extends Data = NoData>({
  pluginKey = ELEMENT_AUTO_COMPLETE,
  id = pluginKey,
  ...props
}: AutoCompleteComboboxProps<TData>): JSX.Element => {
  const editor = usePlateEditorRef()!;

  const { trigger } = getPluginOptions<AutoCompletePlugin>(editor, pluginKey);

  return (
    <Combobox
      id={id}
      trigger={trigger!}
      controlled
      onSelectItem={getAutoCompleteOnSelectItem({
        key: pluginKey,
      })}
      {...props}
    />
  );
};
