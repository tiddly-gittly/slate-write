import { DragItemNode } from '@udecode/plate-dnd';
import type { Value } from '@udecode/slate';
import type { TReactEditor } from '@udecode/slate-react';
import { Path, Transforms } from 'slate';
import type { ReactEditor } from 'slate-react';

export function postDropNormalize<V extends Value>(editor: TReactEditor<V>, dragItem: DragItemNode, path: Path): void {
  if ('parentType' in dragItem) {
    const dragItemWithParent = dragItem;
    if (dragItemWithParent.type === 'li' && (dragItemWithParent.parentType === 'ol' || dragItemWithParent.parentType === 'ul')) {
      // @ts-expect-error Object literal may only specify known properties, and 'type' does not exist in type 'BaseElement'.ts(2345)
      Transforms.wrapNodes(editor as ReactEditor, { type: dragItemWithParent.parentType }, { at: path });
    }
  }
}
