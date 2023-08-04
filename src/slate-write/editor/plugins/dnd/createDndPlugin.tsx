/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable unicorn/no-thenable */
import { createPluginFactory } from '@udecode/plate-core';
import { DndScroller, dndStore, ScrollerProps } from '@udecode/plate-dnd';

export interface DndPlugin {
  enableScroller?: boolean;
  scrollerProps?: Partial<ScrollerProps>;
}

export const KEY_DND = 'dnd';

export const createDndPlugin = createPluginFactory<DndPlugin>({
  key: KEY_DND,
  handlers: {
    onDragStart: () => () => {
      dndStore.set.isDragging(true);
    },
    onDragEnd: () => () => {
      dndStore.set.isDragging(false);
    },
    onDrop: (editor) => () => editor.isDragging as boolean,
  },
  then: (editor, { options }) => ({
    renderAfterEditable: options.enableScroller
      ? () => <DndScroller {...options?.scrollerProps} />
      : undefined,
  }),
});
