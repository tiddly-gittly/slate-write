/* eslint-disable react/prop-types */
import React, { useContext, useMemo } from 'react';
import type { TComboboxItem } from '@udecode/plate-core';
import { ParentWidgetContext, useFilter } from 'tw-react';
import { ComboBoxDorpDownListItem, memorizedRenderText, filterKey } from './ListItem';
import { AutoCompleteCombobox } from '../../plugins/comboBox/AutoCompleteCombobox';

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
