/** copied from plate's packages/ui/dnd/src/hooks/useDropBlockOnEditor.ts, without modification */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { findNode, isExpanded } from '@udecode/plate-core';
import { Path, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { DragItemBlock } from '../types';
import { EElement, getHoverDirection, getNewDirection, TReactEditor, Value, withoutNormalizing } from '@udecode/plate';
import { postDropNormalize } from './postDropNormalize';

export const useDropBlockOnEditor = <V extends Value>(
  editor: TReactEditor<V>,
  {
    blockRef,
    element,
    dropLine,
    setDropLine,
  }: {
    blockRef: any;
    dropLine: string;
    element: EElement<V>;
    setDropLine: Function;
  },
) => {
  const id = element.id as string;
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

      if (direction) {
        if (direction === 'bottom') {
          dropPath = findNode(editor, { at: [], match: { id } })?.[1];
          if (dropPath === undefined) return;
          if (Path.equals(dragPath, Path.next(dropPath))) return;
        }

        if (direction === 'top') {
          const nodePath = findNode(editor, { at: [], match: { id } })?.[1];
          if (nodePath === undefined) return;
          const parentPath = nodePath.slice(0, -1);
          dropPath = [...parentPath, nodePath[nodePath.length - 1] - 1];

          if (Path.equals(dragPath, dropPath)) return;
        }
        if (!dropPath) return;

        const before = Path.isBefore(dragPath, dropPath) && Path.isSibling(dragPath, dropPath);
        const to = before ? dropPath : Path.next(dropPath);

        withoutNormalizing(editor, () => {
          Transforms.moveNodes(editor as ReactEditor, {
            at: dragPath,
            to,
          });
          postDropNormalize(editor, dragItem, to);
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
