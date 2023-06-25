/** copied from plate's packages/ui/dnd/src/components/Draggable.tsx , change to use styled-components */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useRef, MouseEvent } from 'react';
import Tippy from '@tippyjs/react';
import styled, { CSSProp } from 'styled-components';
import is from 'typescript-styled-is';
import useMergedRef from '@react-hook/merged-ref';
import { DragIndicator } from '@styled-icons/material/DragIndicator';
import { useDndBlock } from '../hooks/useDndBlock';
import { DraggableProps } from './Draggable.types';
import { grabberTooltipProps } from './grabberTooltipProps';
import { Value } from '@udecode/plate-core';

interface IStyleMod {
  mod?: string | CSSProp<any>;
}
const DragHandle = styled.button`
  outline: 2px solid transparent;
  outline-offset: 2px;
  padding: 0px;
  background-repeat: no-repeat;
  background-color: transparent;
  border-style: none;
  overflow: hidden;
  cursor: pointer;
`;
const GutterLeft = styled.div<IStyleMod>`
  position: absolute;
  top: 0px;
  display: flex;
  height: 100%;
  opacity: 0;
  transform: translateX(-100%);
  ${({ mod }) => mod}
`;
const DraggableRoot = styled.div`
  position: relative;
  ${is('isDragging')`
    opacity: 50%;
  `}
  & .slate-Draggable-gutterLeft:hover {
    opacity: 100%;
  }
`;
const BlockAndGutter = styled.div`
  /* overflow: auto; */
`;
const BlockToolbarWrapper = styled.div<IStyleMod>`
  display: flex;
  height: 1.5em;
  ${({ mod }) => mod}
`;
const BlockToolbar = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.25rem;
  pointer-events: auto;
`;
const DropLine = styled.div<{ dropLine: '' | 'top' | 'bottom' }>`
  position: absolute;
  margin-left: 0;
  margin-right: 0;
  opacity: 100%;
  height: 0.125rem;
  background: #b4d5ff;
  width: 100%;
  ${({ dropLine }) => (dropLine === 'top' ? 'top: -1px;' : dropLine === 'bottom' ? 'bottom: -1px;' : '')}
`;

export const Draggable = <V extends Value>(props: DraggableProps<V>): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { children, element, componentRef, styles, path } = props;

  const blockReference = useRef<HTMLDivElement>(null);
  const rootReference = useRef<HTMLDivElement>(null);
  const dragWrapperReference = useRef(null);
  const multiRootReference = useMergedRef(componentRef, rootReference);

  const { dropLine, dragRef, isDragging } = useDndBlock({
    element,
    path,
    nodeRef: rootReference,
  });

  const multiDragReference = useMergedRef(dragRef, dragWrapperReference);

  return (
    <DraggableRoot ref={multiRootReference} isDragging={isDragging}>
      <BlockAndGutter ref={blockReference}>
        {children}
        {!!dropLine && <DropLine contentEditable={false} dropLine={dropLine} />}
      </BlockAndGutter>

      <GutterLeft className="slate-Draggable-gutterLeft" mod={styles?.gutterLeft} contentEditable={false}>
        <BlockToolbarWrapper mod={styles?.blockToolbarWrapper}>
          <BlockToolbar ref={multiDragReference}>
            <Tippy {...grabberTooltipProps}>
              <DragHandle type="button" onMouseDown={(event: MouseEvent) => event.stopPropagation()}>
                <DragIndicator
                  style={{
                    width: 18,
                    height: 18,
                    color: 'rgba(55, 53, 47, 0.3)',
                  }}
                />
              </DragHandle>
            </Tippy>
          </BlockToolbar>
        </BlockToolbarWrapper>
      </GutterLeft>
    </DraggableRoot>
  );
};
