/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unicorn/no-null */
import type { Data, NoData, TComboboxItem, TComboboxItemBase } from '@udecode/plate-combobox';
import { useEditorState, useEventEditorSelectors } from '@udecode/plate-core';
import { flip, getRangeBoundingClientRect, offset, shift, useVirtualFloating } from '@udecode/plate-floating';
import { PortalBody } from '@udecode/plate-styled-components';
import { isDefined } from '@udecode/utils';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import is from 'typescript-styled-is';
import shallow from 'zustand/shallow';
import { ComboboxProps, WidgetsListItemTextGetters } from './Combobox.types';
import { useAutoCompletePluginStore } from './store';
import { useComboBox } from './useComboBox';

const Container = styled.ul`
  width: 300px;
  max-height: 288px;
  border-radius: 0 0 2px 2px;
  box-shadow: rgba(0, 0, 0, 0.133) 0 3.2px 7.2px 0, rgba(0, 0, 0, 0.11) 0 0.6px 1.8px 0;
  background-color: white;
  margin: 0;
  padding: 0;
  overflow: scroll;
  overflow: overlay;

  z-index: 500;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  curser: pointer;

  padding: 0 2px;

  font-size: 14px;
  border-radius: 0;
  min-height: 36px;
  user-select: none;
  color: rgb(32, 31, 30);
  background: transparent;

  &:hover {
    background: rgb(243, 242, 241);
  }

  ${is('highlighted')`
    background: rgb(237, 235, 233);

    &:hover {
      background: rgb(237, 235, 233);
    }
  `}
`;
/**
 * Register the combobox id, trigger, onSelectItem
 * Renders the combobox if active.
 */
export function Combobox<TData extends Data = NoData>({
  id,
  onSelectItem,
  onRenderItem,
  items,
  maxSuggestions = items?.length ?? 0,
  filter,
  getRenderTextTemplate,
  getNameTemplate,
}: ComboboxProps<TData> & WidgetsListItemTextGetters): JSX.Element | null {
  const { activeId, highlightedIndex, popperContainer, targetRange, text, filteredItems } = useAutoCompletePluginStore(
    ({ activeId, highlightedIndex, popperContainer, targetRange, text, filteredItems }) => ({
      activeId,
      highlightedIndex,
      popperContainer,
      targetRange,
      text,
      filteredItems: filteredItems[id ?? ''] ?? [],
    }),
    shallow,
  );
  const editor = useEditorState();
  const focusedEditorId = useEventEditorSelectors.focus?.();

  useEffect(() => {
    let result: TComboboxItemBase[] = [];
    if (!items) {
      result = [];
    } else if (!isDefined(text) || text.length === 0) {
      result = items.slice(0, maxSuggestions);
    } else {
      result = items
        .filter((element) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          (filter === undefined ? (value: TComboboxItemBase) => (value.text as string).toLowerCase().startsWith(text.toLowerCase()) : filter(text))(element)
        )
        .slice(0, maxSuggestions);
    }
    if (activeId) {
      useAutoCompletePluginStore.getState().setFilteredItems({ [id]: result });
    }
    // don't let 'activeId' and 'id' cause change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, items, maxSuggestions, text]);

  // Get target range rect
  const getBoundingClientRect = useCallback(() => getRangeBoundingClientRect(editor, targetRange), [editor, targetRange]);

  const isHidden = editor.selection == null || focusedEditorId !== editor.id || activeId !== id;
  // Update popper position
  const { style: containerStyles, floating: floatingReference } = useVirtualFloating({
    placement: 'bottom-start',
    getBoundingClientRect,
    middleware: [offset(4), shift(), flip()],
    open: !isHidden,
  });

  const comboBox = useComboBox(filteredItems);
  const menuProps = comboBox ? comboBox.getMenuProps({}, { suppressRefError: true }) : { ref: null };
  return (
    <PortalBody>
      <Container {...menuProps} ref={floatingReference} style={containerStyles}>
        {filteredItems.map((item, index) => {
          const renderedItem = onRenderItem == null ? item.text : onRenderItem({ item: item as TComboboxItem<TData>, getRenderTextTemplate, getNameTemplate });

          const highlighted = index === highlightedIndex;

          return (
            <Item
              key={item.key}
              highlighted={highlighted}
              {...comboBox.getItemProps({
                item,
                index,
              })}
              onMouseDown={(event: MouseEvent) => {
                event.preventDefault();
                onSelectItem?.(editor, item);
              }}
            >
              {renderedItem}
            </Item>
          );
        })}
      </Container>
    </PortalBody>
  );
}
