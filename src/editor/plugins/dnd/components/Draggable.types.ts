/** copied from plate's packages/ui/dnd/src/components/Draggable.types.ts , delete unused DragHandleProps */
import { TEditor } from '@udecode/plate-core';
import { StyledElementProps } from '@udecode/plate-styled-components';
import { Path } from 'slate';
import { CSSProp } from 'styled-components';
import { Value, EElement, DragHandleProps } from '@udecode/plate';

export interface DraggableStyleProps<V extends Value> extends DraggableProps<V> {
  direction: '' | 'top' | 'bottom';
  isDragging: boolean;

  selected?: boolean;
}

export interface DraggableStyles {
  /**
   * Block.
   */
  block: CSSProp;

  /**
   * Block and gutter.
   */
  blockAndGutter: CSSProp;

  /**
   * Block toolbar in the gutter.
   */
  blockToolbar: CSSProp;

  /**
   * Block toolbar wrapper in the gutter left.
   * It has the height of a line of the block.
   */
  blockToolbarWrapper: CSSProp;

  /**
   * Button to dnd the block, in the block toolbar.
   */
  dragHandle: CSSProp;

  /**
   * Icon of the drag button, in the drag icon.
   */
  dragIcon: CSSProp;

  /**
   * Show a dropline above or below the block when dragging a block.
   */
  dropLine: CSSProp;

  /**
   * Gutter at the left side of the editor.
   * It has the height of the block
   */
  gutterLeft: CSSProp;
}

export interface DraggableProps<V extends Value> extends StyledElementProps<V, EElement<V>, DraggableStyles> {
  componentRef: React.Ref<any>;
  filter?: (editor: TEditor<V>, path: Path) => boolean;
  level?: number;
  /**
   * An override to render the drag handle.
   */
  onRenderDragHandle?: (props: DragHandleProps) => JSX.Element;
  path: Path;
}
