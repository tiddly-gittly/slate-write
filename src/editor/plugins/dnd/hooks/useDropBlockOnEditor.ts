/** copied from plate's packages/ui/dnd/src/hooks/useDropBlockOnEditor.ts, without modification */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { findNode, isExpanded } from '@udecode/plate-core';
import { Path, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { DragItemBlock } from '../types';
import { getHoverDirection, getNewDirection, TReactEditor, Value } from '@udecode/plate';

export const useDropBlockOnEditor = <V extends Value>(
  editor: TReactEditor<V>,
  {
    blockRef,
    id,
    dropLine,
    setDropLine,
  }: {
    blockRef: any;
    dropLine: string;
    id: string;
    setDropLine: Function;
  },
) => {
  return useDrop({
    accept: 'block',
    drop: (dragItem: DragItemBlock, monitor: DropTargetMonitor) => {
      const direction = getHoverDirection(dragItem, monitor, blockRef, id);
      if (!direction) return;

      const dragEntry = findNode(editor, {
        at: [],
        match: { id: dragItem.id },
      });
      if (dragEntry === undefined) return;
      const [, dragPath] = dragEntry;

      ReactEditor.focus(editor as ReactEditor);

      let dropPath: Path | undefined;
      if (direction === 'bottom') {
        dropPath = findNode(editor, { at: [], match: { id } })?.[1];
        if (dropPath === undefined) return;

        if (Path.equals(dragPath, Path.next(dropPath))) return;
      }

      if (direction === 'top') {
        const nodePath = findNode(editor, { at: [], match: { id } })?.[1];

        if (nodePath === undefined) return;
        dropPath = [...nodePath.slice(0, -1), nodePath[nodePath.length - 1] - 1];

        if (Path.equals(dragPath, dropPath)) return;
      }

      if (direction) {
        const _dropPath = dropPath as Path;

        const before = Path.isBefore(dragPath, _dropPath) && Path.isSibling(dragPath, _dropPath);
        const to = before ? _dropPath : Path.next(_dropPath);

        Transforms.moveNodes(editor as ReactEditor, {
          at: dragPath,
          to,
        });
      }
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
      };
    },
    hover(item: DragItemBlock, monitor: DropTargetMonitor) {
      const direction = getHoverDirection(item, monitor, blockRef, id);
      const dropLineDirection = getNewDirection(dropLine, direction);
      if (dropLineDirection) setDropLine(dropLineDirection);

      if (direction && isExpanded(editor.selection)) {
        ReactEditor.focus(editor as ReactEditor);
        Transforms.collapse(editor as ReactEditor);
      }
    },
  });
};
