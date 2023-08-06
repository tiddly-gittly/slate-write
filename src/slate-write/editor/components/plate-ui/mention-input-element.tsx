import React from 'react';
import {
  getHandler,
  PlateElement,
  PlateElementProps,
  Value,
} from '@udecode/plate-common';
import { TMentionElement } from '@udecode/plate-mention';
import { useFocused, useSelected } from 'slate-react';

import { cn } from 'src/slate-write/editor/lib/utils';

export interface MentionInputElementProps
  extends PlateElementProps<Value, TMentionElement> {
  onClick?: (mentionNode: any) => void;
}

const MentionInputElement = React.forwardRef<
  React.ElementRef<typeof PlateElement>,
  MentionInputElementProps
>(({ className, onClick, ...props }, ref) => {
  const { children, element } = props;

  const selected = useSelected();
  const focused = useFocused();

  return (
    <PlateElement
      asChild
      ref={ref}
      data-slate-value={element.value}
      className={cn(
        'inline-block rounded-md bg-slate-100 px-1.5 py-0.5 align-baseline text-sm dark:bg-slate-800',
        selected && focused && 'ring-2 ring-slate-400 dark:ring-slate-800',
        className
      )}
      onClick={getHandler(onClick, element)}
      {...props}
    >
      <span>{children}</span>
    </PlateElement>
  );
});
MentionInputElement.displayName = 'MentionInputElement';

export { MentionInputElement };
