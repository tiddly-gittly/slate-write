/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { PlateElement, PlateElementProps } from '@udecode/plate-utils';
import React from 'react';

import { cn } from 'src/slate-write/editor/lib/utils';

export interface PlateTableRowElementProps extends PlateElementProps {
  hideBorder?: boolean;
}

const TableRowElement = React.forwardRef<
  React.ElementRef<typeof PlateElement>,
  PlateTableRowElementProps
>(({ hideBorder, children, ...props }, reference) => {
  return (
    <PlateElement
      asChild
      ref={reference}
      className={cn('h-full', hideBorder && 'border-none')}
      {...props}
    >
      <tr>{children}</tr>
    </PlateElement>
  );
});
TableRowElement.displayName = 'TableRowElement';

export { TableRowElement };
