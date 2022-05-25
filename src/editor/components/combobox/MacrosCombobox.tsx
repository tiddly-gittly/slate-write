/* eslint-disable react/prop-types */
import React, { useContext, useMemo } from 'react';
import { TComboboxItem } from '@udecode/plate';
import { AutoCompleteCombobox } from 'src/editor/plugins/comboBox/AutoCompleteCombobox';
import { ParentWidgetContext, useFilter } from 'tw-react';
import { ComboBoxDorpDownListItem, memorizedRenderText, filterKey } from './ListItem';

export function MacrosCombobox(props: { id: string; pluginKey: string }): JSX.Element {
  const { id, pluginKey } = props;
  const parentWidget = useContext(ParentWidgetContext);
  const macros = useFilter('[variables[]]', parentWidget, [parentWidget]);
  const macrosItems: TComboboxItem[] = useMemo(() => macros.map((macro) => ({ key: macro, text: `<<${macro}>>` })), [macros]);
  return (
    <AutoCompleteCombobox
      id={pluginKey}
      items={macrosItems}
      pluginKey={pluginKey}
      filter={filterKey}
      onRenderItem={ComboBoxDorpDownListItem}
      getRenderTextTemplate={(item) => memorizedRenderText(`!! ${item.key}\n\n${item.text as string}`)}
    />
  );
}
