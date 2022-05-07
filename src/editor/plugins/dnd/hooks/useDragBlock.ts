import { useDrag } from 'react-dnd';
import { TEditor } from '@udecode/plate-core';

export const useDragBlock = (editor: TEditor, id: string) => {
  return useDrag(
    () => ({
      type: 'block',
      item() {
        /**
         * @url https://github.com/Jermolene/TiddlyWiki5/discussions/6627
         */
        $tw.dragInProgress = true;
        editor.isDragging = true;
        document.body.classList.add('dragging');
        return { id };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: () => {
        $tw.dragInProgress = false;
        editor.isDragging = false;
        document.body.classList.remove('dragging');
      },
    }),
    [],
  );
};
