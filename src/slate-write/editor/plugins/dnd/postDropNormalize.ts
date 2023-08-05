import { WithDraggableOptions } from '@udecode/plate-dnd';
import { findNode, getParentNode, type TEditor, type TElement, type Value, wrapNodes } from '@udecode/slate';
import { DraggableComponents, DraggableProps } from '../../components';

function postDropListNormalize<V extends Value>(editor: TEditor<V>, dragItem: { id: string; parentType: string; type: string }): void {
  if ('parentType' in dragItem) {
    const dragItemWithParent = dragItem;
    if (dragItemWithParent.type === 'li' && (dragItemWithParent.parentType === 'ol' || dragItemWithParent.parentType === 'ul')) {
      setTimeout(() => {
        const newDragEntry = findNode(editor, {
          at: [],
          match: { id: dragItem.id },
        });
        if (newDragEntry !== undefined) {
          const [, newPath] = newDragEntry;
          wrapNodes<TElement>(editor, { type: dragItem.parentType, children: [] }, { at: newPath });
        }
      }, 0);
    }
  }
}

/**
 * @url https://github.com/udecode/plate/discussions/1491
 */
const dropHandlerToFixList: DraggableProps['onDropHandler'] = (editor, props) => {
  const { dragItem } = props;
  const { id } = dragItem;
  const dragEntry = findNode(editor, {
    at: [],
    match: { id },
  });
  if (dragEntry !== undefined) {
    const [currentNode, path] = dragEntry;
    const parentEntry = getParentNode(editor, path);
    if (parentEntry !== undefined) {
      const [parentNode] = parentEntry;
      postDropListNormalize(editor, { id, parentType: parentNode.type as string, type: currentNode.type as string });
    }
  }
  return false;
};

export function addDropHandlers(draggableComponents: DraggableComponents) {
  for (const item of draggableComponents as WithDraggableOptions[]) {
    item.draggableProps ??= {};
    const previousHandler = (item.draggableProps as DraggableProps).onDropHandler;
    if (previousHandler === undefined) {
      (item.draggableProps as DraggableProps).onDropHandler = dropHandlerToFixList;
    } else {
      const newHandler: DraggableProps['onDropHandler'] = (editor, props) => {
        const skip1 = previousHandler(editor, props);
        const skip2 = dropHandlerToFixList!(editor, props);
        return skip1 || skip2;
      };
      (item.draggableProps as DraggableProps).onDropHandler = newHandler;
    }
  }
}
