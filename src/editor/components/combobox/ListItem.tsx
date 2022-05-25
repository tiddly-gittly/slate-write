/* eslint-disable react/prop-types */
import React from 'react';
import type { ComboboxItemProps, TComboboxItemBase } from '@udecode/plate';
import styled from 'styled-components';
import memorize from 'lodash/memoize';
import { LazyTippy } from './PreviewTooltip';
import { WidgetsListItemTextGetters } from 'src/editor/plugins/comboBox/Combobox.types';

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

export const memorizedRenderText = memorize((text: string) => $tw.wiki.renderText('text/html', 'text/vnd.tiddlywiki', text));
export const memorizedRenderTiddler = memorize((title: string) => $tw.wiki.renderTiddler('text/html', title));

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
      placement="right"
      hideOnClick>
      <ListItemContentContainer>
        <Name>{props.getNameTemplate?.(props.item) ?? props.item.text}</Name>
      </ListItemContentContainer>
    </LazyTippy>
  );
}
