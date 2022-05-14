/** copied from plate's packages/ui/dnd/src/hooks/useDragBlock.ts, add $tw things */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useDrag } from 'react-dnd';
import { TEditor, Value } from '@udecode/plate-core';
import { EElement, findNode } from '@udecode/plate';
import { Editor, Path } from 'slate';

export const useDragBlock = <V extends Value>(editor: TEditor<V>, element: EElement<V>, path: Path) => {
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
        const parentNode = Editor.above(editor as Editor, { at: path })?.[0] as EElement<V> | undefined;
        return { id: element.id, type: element.type, parentType: parentNode?.type };
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
