import type { FC } from 'react';

import { createNodesWithHOC } from '@udecode/plate-common/react';
import { withDraggable as withDraggablePrimitive, type WithDraggableOptions } from '@udecode/plate-dnd';

import { draggableComponents } from '../../config/draggableComponents';

import { Draggable, type DraggableProps } from './draggable';

export const withDraggable = (
  Component: FC,
  options?: WithDraggableOptions<
    Partial<Omit<DraggableProps, 'children' | 'editor' | 'element'>>
  >,
) => withDraggablePrimitive<DraggableProps>(Draggable, Component, options as any);

export const withDraggablesPrimitive = createNodesWithHOC(withDraggable);

export const withDraggables = (components: any) => {
  return withDraggablesPrimitive(components, draggableComponents);
};
