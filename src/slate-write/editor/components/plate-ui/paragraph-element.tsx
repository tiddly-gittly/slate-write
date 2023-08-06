import { PlateElement, PlateElementProps } from '@udecode/plate-utils';
import React from 'react';

import { cn } from 'src/slate-write/editor/lib/utils';

const ParagraphElement = React.forwardRef<
  React.ElementRef<typeof PlateElement>,
  PlateElementProps
>(({ className, children, ...props }: PlateElementProps, reference) => {
  return (
    <PlateElement
      ref={reference}
      className={cn('m-0 px-0 py-1', className)}
      {...props}
    >
      {children}
    </PlateElement>
  );
});
ParagraphElement.displayName = 'ParagraphElement';

export { ParagraphElement };
