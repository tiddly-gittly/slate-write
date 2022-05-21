/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { ComboboxItemProps, TComboboxItemBase } from '@udecode/plate';
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

const filter = (text: string) => (value: TComboboxItemBase) => value.key.toLowerCase().startsWith(text.toLowerCase());

const memorizedRenderTiddler = memorize((title: string) => $tw.wiki.renderTiddler('text/html', title));

function TiddlerListItem(props: ComboboxItemProps<undefined>): JSX.Element {
  function PreviewWithWikiText(): JSX.Element {
    const renderResult = memorizedRenderTiddler(props.item.key);
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

export function WikiLinkCombobox(props: { id: string; pluginKey: string }): JSX.Element {
  const { id, pluginKey } = props;
  const tiddlers: TComboboxItemBase[] = useMemo(() => $tw.wiki.getTiddlers().map((title) => ({ key: title, text: title })), []);
  // DEBUG: console
  console.log(`tiddlers`, tiddlers);
  // don't pass id to it, otherwise list will be empty, don't know why
  return <AutoCompleteCombobox id={pluginKey} items={tiddlers} pluginKey={pluginKey} filter={filter} onRenderItem={TiddlerListItem} />;
}
