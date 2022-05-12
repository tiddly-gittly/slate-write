/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { forwardRef, useMemo } from 'react';
import { createNodesWithHOC, PlateRenderElementProps, TEditor } from '@udecode/plate-core';
import { Path } from 'slate';
import { ReactEditor, useReadOnly } from 'slate-react';
import { Draggable } from './Draggable';
import { DraggableProps } from './Draggable.types';
import { Value } from '@udecode/plate';

export interface WithDraggableOptions<V extends Value> extends Pick<DraggableProps<V>, 'onRenderDragHandle' | 'styles'> {
  allowReadOnly?: boolean;
  filter?: (editor: TEditor<V>, path: Path) => boolean;
  level?: number;
}

export const withDraggable = <V extends Value>(
  Component: React.ComponentClass,
  { styles, level, filter, allowReadOnly = false, onRenderDragHandle }: WithDraggableOptions<V> = {},
) => {
  // eslint-disable-next-line react/display-name
  return forwardRef((props: PlateRenderElementProps<V>, reference) => {
    const { attributes, element, editor } = props;
    const readOnly = useReadOnly();
    const path = useMemo(() => ReactEditor.findPath(editor as ReactEditor, element), [editor, element]);

    const filteredOut = useMemo(() => (Number.isInteger(level) && level !== path.length - 1) || filter?.(editor, path), [path, editor]);

    if (filteredOut ?? (!allowReadOnly && readOnly)) {
      return <Component {...props} />;
    }

    return (
      <Draggable editor={editor} attributes={attributes} element={element} componentRef={reference} styles={styles}>
        <Component {...props} />
      </Draggable>
    );
  });
};

export const withDraggables = createNodesWithHOC(withDraggable);
