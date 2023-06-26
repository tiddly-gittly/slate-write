/* eslint-disable react/prop-types */
import type { TComboboxItemBase, TComboboxItemWithData } from '@udecode/plate-combobox';
import type { ComboboxItemProps } from '@udecode/plate-ui';
import React from 'react';
import { AutoCompleteCombobox } from '../../plugins/comboBox/AutoCompleteCombobox';
import { ComboBoxDorpDownListItem, memorizedRenderText } from './ListItem';
import { type ISnippetComboboxItem, snippets } from './snippets';

const filter = (text: string) => (value: TComboboxItemBase) => (value as ComboboxItemProps<ISnippetComboboxItem>['item']).data.name.toLowerCase().startsWith(text.toLowerCase());

export function SnippetCombobox(props: { id: string; pluginKey: string }): JSX.Element {
  const { id, pluginKey } = props;
  // don't pass id to it, otherwise list will be empty, don't know why
  return (
    <AutoCompleteCombobox
      id={pluginKey}
      items={snippets}
      pluginKey={pluginKey}
      filter={filter}
      onRenderItem={ComboBoxDorpDownListItem}
      getRenderTextTemplate={(item) => memorizedRenderText((item as TComboboxItemWithData<ISnippetComboboxItem>).data.preview)}
      getNameTemplate={(item) => (item as TComboboxItemWithData<ISnippetComboboxItem>).data.name}
    />
  );
}
