/** copied from plate's packages/ui/dnd/src/hooks/useDndBlock.ts, without modification */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEditorRef } from '@udecode/plate-core';
import { EElement, Value } from '@udecode/slate';
import { useState } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Path } from 'slate';
import { useDragBlock } from './useDragBlock';
import { useDropBlock } from './useDropBlock';

export const useDndBlock = <V extends Value>({
  element,
  nodeRef,
  path,
  removePreview,
}: {
  element: EElement<V>;
  nodeRef: any;
  path: Path;
  removePreview?: boolean;
}) => {
  const editor = useEditorRef();

  const [dropLine, setDropLine] = useState<'' | 'top' | 'bottom'>('');

  const [{ isDragging }, dragReference, preview] = useDragBlock(editor, element, path);
  const [{ isOver }, drop] = useDropBlock(editor, {
    element,
    nodeRef,
    dropLine,
    setDropLine,
  });

  // TODO: previewElement option
  if (removePreview === true) {
    drop(nodeRef);
    preview(getEmptyImage(), { captureDraggingState: true });
  } else {
    preview(drop(nodeRef));
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
