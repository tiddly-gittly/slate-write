/* eslint-disable react/prop-types */
import React from 'react';
import { ComboboxItemProps, TComboboxItemBase, TComboboxItemWithData } from '@udecode/plate';
import { ISnippetComboboxItem, snippets } from './snippets';
import { AutoCompleteCombobox } from 'src/editor/plugins/comboBox/AutoCompleteCombobox';
import { ComboBoxDorpDownListItem, memorizedRenderText } from './ListItem';

const filter = (text: string) => (value: TComboboxItemBase) =>
  (value as ComboboxItemProps<ISnippetComboboxItem>['item']).data.name.toLowerCase().startsWith(text.toLowerCase());

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
