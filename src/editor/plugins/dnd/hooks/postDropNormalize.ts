import { DragItemBlock, TReactEditor, Value } from '@udecode/plate-core';
import { Path, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import type { DragItemWithParent } from './useDragBlock';

export function postDropNormalize<V extends Value>(editor: TReactEditor<V>, dragItem: DragItemBlock, path: Path): void {
  if ('parentType' in dragItem) {
    const dragItemWithParent = dragItem as DragItemWithParent;
    if (dragItemWithParent.type === 'li' && (dragItemWithParent.parentType === 'ol' || dragItemWithParent.parentType === 'ul')) {
      Transforms.wrapNodes(editor as ReactEditor, { type: dragItemWithParent.parentType }, { at: path });
    }
  }
}
