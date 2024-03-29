/* eslint-disable react/prop-types */
import { TComboboxItemBase } from '@udecode/plate-combobox';
import memoize from 'memize';
import React from 'react';
import styled from 'styled-components';
import { ComboboxItemProps, WidgetsListItemTextGetters } from '../../plugins/comboBox/Combobox.types';
import { LazyTippy } from './PreviewTooltip';

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

export const memorizedRenderText = memoize((text: string) => $tw.wiki.renderText('text/html', 'text/vnd.tiddlywiki', text));
export const memorizedRenderTiddler = memoize((title: string) => $tw.wiki.renderTiddler('text/html', title));

export const filterKey = (text: string) => (value: TComboboxItemBase) => value.key.toLowerCase().startsWith(text.toLowerCase());

function PreviewWithWikiText(props: ComboboxItemProps<any> & WidgetsListItemTextGetters): JSX.Element {
  const renderResult = props.getRenderTextTemplate(props.item);
  return <Preview dangerouslySetInnerHTML={{ __html: renderResult }} />;
}
export function ComboBoxDorpDownListItem(props: ComboboxItemProps<any> & WidgetsListItemTextGetters): JSX.Element {
  return (
    <LazyTippy
      content={<PreviewWithWikiText getRenderTextTemplate={props.getRenderTextTemplate} item={props.item} />}
      showOnCreate={false}
      placement='right'
      hideOnClick
    >
      <ListItemContentContainer>
        <Name>{props.getNameTemplate?.(props.item) ?? props.item.text}</Name>
      </ListItemContentContainer>
    </LazyTippy>
  );
}
