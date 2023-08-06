/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TMentionElement } from '@udecode/plate-mention';
import { PlateElement, PlateElementProps } from '@udecode/plate-utils';
import React, { forwardRef } from 'react';
import { useFocused, useSelected } from 'slate-react';

import { Value } from '@udecode/slate';
import { getHandler } from '@udecode/utils';
import { cn } from 'src/slate-write/editor/lib/utils';

export interface MentionElementProps extends PlateElementProps<Value, TMentionElement> {
  onClick?: (mentionNode: any) => void;
  /**
   * Prefix rendered before mention
   */
  prefix?: string;
  renderLabel?: (mentionable: TMentionElement) => string;
}

const MentionElement = forwardRef<
  React.ElementRef<typeof PlateElement>,
  MentionElementProps
>(({ prefix, renderLabel, className, onClick, ...props }, reference) => {
  const { children, element } = props;

  const selected = useSelected();
  const focused = useFocused();

  return (
    <PlateElement
      ref={reference}
      className={cn(
        'inline-block cursor-pointer rounded-md bg-slate-100 px-1.5 py-0.5 align-baseline text-sm font-medium dark:bg-slate-800',
        selected && focused && 'ring-2 ring-slate-400 dark:ring-slate-800',
        className,
      )}
      data-slate-value={element.value}
      contentEditable={false}
      onClick={getHandler(onClick, element)}
      {...props}
    >
      {prefix}
      {(renderLabel === undefined) ? element.value : renderLabel(element)}
      {children}
    </PlateElement>
  );
});

MentionElement.displayName = 'MentionElement';

export { MentionElement };
