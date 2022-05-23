/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ComboboxItemProps, TComboboxItem, TComboboxItemBase } from '@udecode/plate';
import styled from 'styled-components';
import memorize from 'lodash/memoize';
import { LazyTippy } from './PreviewTooltip';
import { AutoCompleteCombobox } from 'src/editor/plugins/comboBox/AutoCompleteCombobox';
import { Widget } from 'tiddlywiki';
import { ParentWidgetContext, useFilter } from 'tw-react';

const ListItemContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Preview = styled.div``;
const Name = styled.div``;

const filter = (text: string) => (value: TComboboxItemBase) =>
  ((value as ComboboxItemProps<TComboboxItem>['item']).text as string).toLowerCase().startsWith(text.toLowerCase());

const memorizedRenderText = memorize((text: string) => $tw.wiki.renderText('text/html', 'text/vnd.tiddlywiki', text));

function SnippetListItem(props: ComboboxItemProps<TComboboxItem>): JSX.Element {
  function PreviewWithWikiText(): JSX.Element {
    const renderResult = memorizedRenderText(`<<${props.item.text as string}>>`);
    return <Preview dangerouslySetInnerHTML={{ __html: renderResult }} />;
  }
  return (
    <LazyTippy content={<PreviewWithWikiText />} showOnCreate={false} placement="right" hideOnClick>
      <ListItemContentContainer>
        <Name>{props.item.text}</Name>
      </ListItemContentContainer>
    </LazyTippy>
  );
}

export function MacrosCombobox(props: { id: string; pluginKey: string }): JSX.Element {
  const { id, pluginKey } = props;
  const parentWidget = useContext(ParentWidgetContext);
  const macros = useFilter('[variables[]]', parentWidget, [parentWidget]);
  const macrosItems: TComboboxItem[] = useMemo(() => macros.map((macro) => ({ key: macro, text: macro })), [macros]);
  // don't pass id to it, otherwise list will be empty, don't know why
  return <AutoCompleteCombobox id={pluginKey} items={macrosItems} pluginKey={pluginKey} filter={filter} onRenderItem={SnippetListItem} />;
}
