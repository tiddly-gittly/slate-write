import React, { forwardRef, ReactNode, useEffect, useMemo, useState } from 'react';
import { ComboboxItemProps, comboboxStore, getComboboxStoreById, MentionCombobox, TComboboxItemBase } from '@udecode/plate';
import { ISnippetComboboxItem, snippets } from '../config/snippets';
import styled from 'styled-components';
import Tippy, { TippyProps } from '@tippyjs/react';
import memorize from 'lodash/memoize';

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

/** from https://gist.github.com/atomiks/520f4b0c7b537202a23a3059d4eec908 */
export const LazyTippy = (props: TippyProps) => {
  const [mounted, setMounted] = React.useState(false);

  const lazyPlugin = {
    fn: () => ({
      onMount: () => setMounted(true),
      onHidden: () => setMounted(false),
    }),
  };

  const computedProps = { ...props };

  computedProps.plugins = [lazyPlugin, ...(props.plugins || [])];

  if (props.render) {
    const render = props.render; // let TypeScript safely derive that render is not undefined
    computedProps.render = (...args) => (mounted ? render(...args) : '');
  } else {
    computedProps.content = mounted ? props.content : '';
  }

  return <Tippy {...computedProps} />;
};
const memorizedRenderText = memorize((text: string) => $tw.wiki.renderText('text/html', 'text/vnd.tiddlywiki', text));

function SnippetListItem(props: ComboboxItemProps<ISnippetComboboxItem>): JSX.Element {
  function PreviewWithWikiText() {
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

export function SnippetCombobox(props: { id: string; trigger: string }): JSX.Element {
  const { id, trigger } = props;
  // don't pass id to it, otherwise list will be empty, don't know why
  return <MentionCombobox items={snippets} pluginKey={trigger} filter={filter} onRenderItem={SnippetListItem} />;
}
