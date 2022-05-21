/* eslint-disable react/prop-types */
import React from 'react';
import { ComboboxItemProps, TComboboxItemBase } from '@udecode/plate';
import { ISnippetComboboxItem, snippets } from '../../config/snippets';
import styled from 'styled-components';
import memorize from 'lodash/memoize';
import { LazyTippy } from './PreviewTooltip';
import { AutoCompleteCombobox } from 'src/editor/plugins/comboBox/AutoCompleteCombobox';

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
  (value as ComboboxItemProps<ISnippetComboboxItem>['item']).data.name.toLowerCase().startsWith(text.toLowerCase());

const memorizedRenderText = memorize((text: string) => $tw.wiki.renderText('text/html', 'text/vnd.tiddlywiki', text));

function SnippetListItem(props: ComboboxItemProps<ISnippetComboboxItem>): JSX.Element {
  function PreviewWithWikiText(): JSX.Element {
    const renderResult = memorizedRenderText(props.item.data.preview);
    return <Preview dangerouslySetInnerHTML={{ __html: renderResult }} />;
  }
  return (
    <LazyTippy content={<PreviewWithWikiText />} showOnCreate={false} placement="right" hideOnClick>
      <ListItemContentContainer>
        <Name>{props.item.data.name}</Name>
      </ListItemContentContainer>
    </LazyTippy>
  );
}

export function SnippetCombobox(props: { id: string; pluginKey: string }): JSX.Element {
  const { id, pluginKey } = props;
  // don't pass id to it, otherwise list will be empty, don't know why
  return <AutoCompleteCombobox id={pluginKey} items={snippets} pluginKey={pluginKey} filter={filter} onRenderItem={SnippetListItem} />;
}
