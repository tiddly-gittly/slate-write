/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { DragItemNode, useDraggable, useDraggableState } from '@udecode/plate-dnd';
import React, { forwardRef, useEffect } from 'react';
import { DropTargetMonitor } from 'react-dnd';

import { DragHandle } from '@styled-icons/material/DragHandle';
import { cn } from 'src/slate-write/editor/lib/utils';

import { ClassNames, PlateElementProps } from '@udecode/plate-utils';
import { TEditor } from '@udecode/slate';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

export interface DraggableProps extends
  PlateElementProps,
  ClassNames<{
    /**
     * Block.
     */
    block: string;

    /**
     * Block and gutter.
     */
    blockAndGutter: string;

    /**
     * Block toolbar in the gutter.
     */
    blockToolbar: string;

    /**
     * Block toolbar wrapper in the gutter left.
     * It has the height of a line of the block.
     */
    blockToolbarWrapper: string;

    blockWrapper: string;

    /**
     * Button to dnd the block, in the block toolbar.
     */
    dragHandle: string;

    /**
     * Icon of the drag button, in the drag icon.
     */
    dragIcon: string;

    /**
     * Show a dropline above or below the block when dragging a block.
     */
    dropLine: string;

    /**
     * Gutter at the left side of the editor.
     * It has the height of the block
     */
    gutterLeft: string;
  }>
{
  /**
   * Intercepts the drop handling.
   * If `false` is returned, the default drop behavior is called after.
   * If `true` is returned, the default behavior is not called.
   */
  onDropHandler?: (
    editor: TEditor,
    props: {
      dragItem: DragItemNode;
      id: string;
      monitor: DropTargetMonitor<DragItemNode, unknown>;
      nodeRef: any;
    },
  ) => boolean;
}

const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  ({ className, classNames = {}, onDropHandler, ...props }, reference) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { children, element } = props;

    const state = useDraggableState({ element, onDropHandler });
    const { dropLine, isDragging } = state;
    const { droplineProps, gutterLeftProps, previewRef, handleRef } = useDraggable(state);

    useEffect(() => {
      $tw.dragInProgress = isDragging;
    }, [isDragging]);

    return (
      <div
        className={cn(
          'relative',
          isDragging && 'opacity-50',
          'group',
          className,
        )}
        ref={reference}
      >
        <div
          className={cn(
            'pointer-events-none absolute top-0 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100',
            classNames.gutterLeft,
          )}
          {...gutterLeftProps}
        >
          <div className={cn('flex h-[1.5em]', classNames.blockToolbarWrapper)}>
            <div
              className={cn(
                'pointer-events-auto mr-1 flex items-center tw-slate-write-drag-handle',
                classNames.blockToolbar,
              )}
            >
              <Tooltip>
                <TooltipTrigger ref={handleRef}>
                  <DragHandle className='h-4 w-4 text-slate-500 dark:text-slate-400' />
                </TooltipTrigger>
                <TooltipContent>Drag to move</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className={cn('', classNames.blockWrapper)} ref={previewRef}>
          {children}

          {!!dropLine && (
            <div
              className={cn(
                'absolute inset-x-0 h-0.5 opacity-100',
                'bg-slate-400 dark:bg-slate-800',
                dropLine === 'top' && '-top-px',
                dropLine === 'bottom' && '-bottom-px',
                classNames.dropLine,
              )}
              {...droplineProps}
            />
          )}
        </div>
      </div>
    );
  },
);
Draggable.displayName = 'Draggable';

export { Draggable };
