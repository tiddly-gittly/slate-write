/* eslint-disable react/prop-types */
import { TComboboxItem } from '@udecode/plate-combobox';
import React, { useMemo } from 'react';
import type { Widget } from 'tiddlywiki';
import { AutoCompleteCombobox } from '../../plugins/comboBox/AutoCompleteCombobox';
import { ComboBoxDorpDownListItem, filterKey, memorizedRenderText } from './ListItem';

export type IWidgetItem = TComboboxItem<{ widgetClass: typeof Widget }>;

export function WidgetCombobox(props: { id: string; pluginKey: string }): JSX.Element {
  const { id, pluginKey } = props;
  const widgetItems: IWidgetItem[] = useMemo(
    () => Object.entries($tw.rootWidget.widgetClasses).map(([key, widgetClass]) => ({ key, text: `<$${key} />`, data: { widgetClass } })),
    [],
  );
  // don't pass id to it, otherwise list will be empty, don't know why
  return (
    <AutoCompleteCombobox
      id={pluginKey}
      items={widgetItems}
      pluginKey={pluginKey}
      filter={filterKey}
      onRenderItem={ComboBoxDorpDownListItem}
      getRenderTextTemplate={(item: TComboboxItem) => memorizedRenderText(`!! ${item.key}\n\n${item.text as string}`)}
      getNameTemplate={(item) => (item as IWidgetItem).data.widgetClass.name}
    />
  );
}
