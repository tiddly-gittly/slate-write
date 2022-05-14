import { DragItemBlock, TReactEditor, Value } from '@udecode/plate';
import { Path, Transforms } from 'slate';
import type { DragItemWithParent } from './useDragBlock';

export function postDropNormalize<V extends Value>(editor: TReactEditor<V>, dragItem: DragItemBlock, path: Path): void {
  if ('parentType' in dragItem) {
    const dragItemWithParent = dragItem as DragItemWithParent;
    if (dragItemWithParent.type === 'li' && (dragItemWithParent.parentType === 'ol' || dragItemWithParent.parentType === 'ul')) {
      Transforms.wrapNodes(editor, { type: dragItemWithParent.parentType }, { at: path });
    }
  }
}
