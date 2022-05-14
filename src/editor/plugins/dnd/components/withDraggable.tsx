/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { forwardRef, useMemo } from 'react';
import { createNodesWithHOC, PlateRenderElementProps, TEditor } from '@udecode/plate-core';
import { Path } from 'slate';
import { ReactEditor, useReadOnly } from 'slate-react';
import { Draggable } from './Draggable';
import { DraggableProps } from './Draggable.types';
import { EElement, Value } from '@udecode/plate';

export interface WithDraggableOptions<V extends Value> extends Pick<DraggableProps<V>, 'onRenderDragHandle' | 'styles'> {
  /**
   * @param editor wrapper of slate editor, you can use API from slate like `ReactEditor.isComposing(editor)`
   * @param path like `[0, 0, 1, 0, 1, 0]`
   */
  filter?: (editor: TEditor<V>, path: Path /* , element: EElement<V> */) => boolean;
  /** at which level will it generate grabber.
   *
   * for example: level 0 means only when it at root's direct children will it have grabber, if it is wrapped with a `p`, then there will not be grabber, it will only be grab with the p wrapper. */
  level?: number;
}

export const withDraggable = <V extends Value>(Component: React.ComponentClass, { styles, level, filter }: WithDraggableOptions<V> = {}) => {
  // eslint-disable-next-line react/display-name
  return forwardRef((props: PlateRenderElementProps<V>, reference) => {
    const { attributes, element, editor } = props;
    const readOnly = useReadOnly();
    const path = useMemo(() => ReactEditor.findPath(editor as ReactEditor, element), [editor, element]);

    const filteredOut = useMemo(() => (Number.isInteger(level) && level !== path.length - 1) || filter?.(editor, path), [editor, path]);

    if (filteredOut ?? readOnly) {
      return <Component {...props} />;
    }

    return (
      <Draggable editor={editor} attributes={attributes} element={element} componentRef={reference} styles={styles} path={path}>
        <Component {...props} />
      </Draggable>
    );
  });
};

export const withDraggables = createNodesWithHOC(withDraggable);
