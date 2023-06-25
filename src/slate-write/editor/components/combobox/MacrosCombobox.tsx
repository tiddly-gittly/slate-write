/* eslint-disable react/prop-types */
import type { TComboboxItem } from '@udecode/plate-core';
import React, { useContext, useMemo } from 'react';
import { ParentWidgetContext, useFilter } from 'tw-react';
import { AutoCompleteCombobox } from '../../plugins/comboBox/AutoCompleteCombobox';
import { ComboBoxDorpDownListItem, filterKey, memorizedRenderText } from './ListItem';

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
