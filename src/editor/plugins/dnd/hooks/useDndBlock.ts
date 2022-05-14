/** copied from plate's packages/ui/dnd/src/hooks/useDndBlock.ts, without modification */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useEditorRef } from '@udecode/plate-core';
import { useDragBlock } from './useDragBlock';
import { useDropBlockOnEditor } from './useDropBlockOnEditor';
import { EElement, Value } from '@udecode/plate';
import { Path } from 'slate';

export const useDndBlock = <V extends Value>({
  element,
  blockRef,
  path,
  removePreview,
}: {
  blockRef: any;
  element: EElement<V>;
  path: Path;
  removePreview?: boolean;
}) => {
  const editor = useEditorRef();

  const [dropLine, setDropLine] = useState<'' | 'top' | 'bottom'>('');

  const [{ isDragging }, dragReference, preview] = useDragBlock(editor, element, path);
  const [{ isOver }, drop] = useDropBlockOnEditor(editor, {
    element,
    blockRef,
    dropLine,
    setDropLine,
  });

  // TODO: previewElement option
  if (removePreview === true) {
    drop(blockRef);
    preview(getEmptyImage(), { captureDraggingState: true });
  } else {
    preview(drop(blockRef));
  }

  if (!isOver && dropLine !== '') {
    setDropLine('');
  }

  return {
    isDragging,
    dropLine,
    dragRef: dragReference,
  };
};
