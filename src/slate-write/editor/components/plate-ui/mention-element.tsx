import React, { forwardRef } from 'react';
import {
  getHandler,
  PlateElement,
  PlateElementProps,
  Value,
} from '@udecode/plate-common';
import { TMentionElement } from '@udecode/plate-mention';
import { useFocused, useSelected } from 'slate-react';

import { cn } from 'src/slate-write/editor/lib/utils';

export interface MentionElementProps
  extends PlateElementProps<Value, TMentionElement> {
  /**
   * Prefix rendered before mention
   */
  prefix?: string;
  onClick?: (mentionNode: any) => void;
  renderLabel?: (mentionable: TMentionElement) => string;
}

const MentionElement = forwardRef<
  React.ElementRef<typeof PlateElement>,
  MentionElementProps
>(({ prefix, renderLabel, className, onClick, ...props }, ref) => {
  const { children, element } = props;

  const selected = useSelected();
  const focused = useFocused();

  return (
    <PlateElement
      ref={ref}
      className={cn(
        'inline-block cursor-pointer rounded-md bg-slate-100 px-1.5 py-0.5 align-baseline text-sm font-medium dark:bg-slate-800',
        selected && focused && 'ring-2 ring-slate-400 dark:ring-slate-800',
        className
      )}
      data-slate-value={element.value}
      contentEditable={false}
      onClick={getHandler(onClick, element)}
      {...props}
    >
      {prefix}
      {renderLabel ? renderLabel(element) : element.value}
      {children}
    </PlateElement>
  );
});

MentionElement.displayName = 'MentionElement';

export { MentionElement };
