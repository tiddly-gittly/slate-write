import React, { forwardRef, useMemo } from 'react';
import { createNodesWithHOC, PlateRenderElementProps, TEditor } from '@udecode/plate-core';
import { Path } from 'slate';
import { ReactEditor, useReadOnly } from 'slate-react';
import { Draggable } from './Draggable';
import { DraggableProps } from './Draggable.types';

export interface WithDraggableOptions extends Pick<DraggableProps, 'styles'> {
  allowReadOnly?: boolean;
  filter?: (editor: TEditor, path: Path) => boolean;
  level?: number;
}

export const withDraggable = (Component: any, { styles, level, filter, allowReadOnly = false }: WithDraggableOptions = {}) => {
  return forwardRef((props: PlateRenderElementProps, reference) => {
    const { attributes, element, editor } = props;
    const readOnly = useReadOnly();
    const path = useMemo(() => ReactEditor.findPath(editor, element), [editor, element]);

    const filteredOut = useMemo(() => (Number.isInteger(level) && level !== path.length - 1) || (filter != undefined && filter(editor, path)), [path, editor]);

    if (filteredOut || (!allowReadOnly && readOnly)) {
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
