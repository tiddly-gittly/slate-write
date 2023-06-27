import { DragIndicator } from '@styled-icons/material/DragIndicator';
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
`;

export function DragHandle() {
  return (
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
  );
}
