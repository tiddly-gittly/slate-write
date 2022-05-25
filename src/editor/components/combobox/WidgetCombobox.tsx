/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import type { TComboboxItem } from '@udecode/plate';
import { AutoCompleteCombobox } from 'src/editor/plugins/comboBox/AutoCompleteCombobox';
import { Widget } from 'tiddlywiki';
import { ComboBoxDorpDownListItem, filterKey, memorizedRenderText } from './ListItem';

export type IWidgetItem = TComboboxItem<{ widgetClass: Widget }>;

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
      getRenderTextTemplate={(item) => memorizedRenderText(`!! ${item.key}\n\n${item.text as string}`)}
      getNameTemplate={(item) => (item as IWidgetItem).data.widgetClass.name}
    />
  );
}
