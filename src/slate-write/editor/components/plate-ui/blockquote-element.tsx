'use client';

import { PlateElement, PlateElementProps } from '@udecode/plate-utils';
import React from 'react';

import { cn } from 'src/slate-write/editor/lib/utils';

const BlockquoteElement = React.forwardRef<
  React.ElementRef<typeof PlateElement>,
  PlateElementProps
>(({ className, children, ...props }, reference) => {
  return (
    <PlateElement
      asChild
      ref={reference}
      className={cn('my-1 border-l-2 pl-6 italic', className)}
      {...props}
    >
      <blockquote>{children}</blockquote>
    </PlateElement>
  );
});
BlockquoteElement.displayName = 'BlockquoteElement';

export { BlockquoteElement };
