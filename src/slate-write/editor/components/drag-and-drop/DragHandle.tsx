import { DragIndicator } from '@styled-icons/material/DragIndicator';
import Tippy from '@tippyjs/react';
import { grabberTooltipProps } from '@udecode/plate-ui-dnd';
import React, { MouseEvent } from 'react';
import styled from 'styled-components';

const Container = styled.button`
  outline: 2px solid transparent;
  outline-offset: 2px;
  padding: 0px;
  background-repeat: no-repeat;
  background-color: transparent;
  border-style: none;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  &:hover {
    opacity: unset;
  }
`;

export function DragHandle() {
  return (
    <Tippy {...grabberTooltipProps}>
      <Container
        type='button'
        className='drag-button'
        onMouseDown={(event: MouseEvent) => {
          event.stopPropagation();
          $tw.dragInProgress = true;
        }}
        onMouseUp={(event: MouseEvent) => {
          event.stopPropagation();
          $tw.dragInProgress = false;
        }}
      >
        <DragIndicator
          style={{
            width: 18,
            height: 18,
            color: 'rgba(55, 53, 47, 0.3)',
          }}
        />
      </Container>
    </Tippy>
  );
}
