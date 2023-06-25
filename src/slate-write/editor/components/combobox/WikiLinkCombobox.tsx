/* eslint-disable react/prop-types */
import type { TComboboxItemBase } from '@udecode/plate-core';
import React, { useMemo } from 'react';
import { AutoCompleteCombobox } from '../../plugins/comboBox/AutoCompleteCombobox';
import { ComboBoxDorpDownListItem, filterKey, memorizedRenderTiddler } from './ListItem';

export function WikiLinkCombobox(props: { id: string; pluginKey: string }): JSX.Element {
  const { id, pluginKey } = props;
  const tiddlers: TComboboxItemBase[] = useMemo(() => $tw.wiki.getTiddlers().map((title) => ({ key: title, text: title })), []);
  // don't pass id to it, otherwise list will be empty, don't know why
  return (
    <AutoCompleteCombobox
      id={pluginKey}
      items={tiddlers}
      pluginKey={pluginKey}
      filter={filterKey}
      onRenderItem={ComboBoxDorpDownListItem}
      getRenderTextTemplate={(item) => memorizedRenderTiddler(item.key)}
    />
  );
}
