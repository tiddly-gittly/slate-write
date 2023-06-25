/** copied from plate's packages/ui/dnd/src/hooks/useDragBlock.ts, add $tw things */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DragItemBlock, EElement, TEditor, Value } from '@udecode/slate';
import { useDrag } from 'react-dnd';
import { Editor, Path } from 'slate';

export interface DragItemWithParent extends DragItemBlock {
  parentType?: string;
}
export const useDragBlock = <V extends Value>(editor: TEditor<V>, element: EElement<V>, path: Path) => {
  return useDrag(
    () => ({
      type: 'block',
      item(): DragItemWithParent {
        /**
         * @url https://github.com/Jermolene/TiddlyWiki5/discussions/6627
         */
        $tw.dragInProgress = true;
        editor.isDragging = true;
        document.body.classList.add('dragging');
        const parentNode = Editor.above(editor as Editor, { at: path })?.[0] as EElement<V> | undefined;
        return { id: element.id as string, type: element.type, parentType: parentNode?.type };
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
