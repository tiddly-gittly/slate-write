import { TLinkElement, useLink } from '@udecode/plate-link';
import { PlateElement, PlateElementProps } from '@udecode/plate-utils';
import { Value } from '@udecode/slate';
import React from 'react';

import { cn } from 'src/slate-write/editor/lib/utils';

const LinkElement = React.forwardRef<
  React.ElementRef<typeof PlateElement>,
  PlateElementProps<Value, TLinkElement>
>(({ className, children, ...props }, reference) => {
  const { props: linkProps } = useLink({ element: props.element });

  return (
    <PlateElement
      asChild
      ref={reference}
      className={cn('font-medium underline underline-offset-4', className)}
      {...linkProps}
      {...(props as any)}
    >
      <a>{children}</a>
    </PlateElement>
  );
});
LinkElement.displayName = 'LinkElement';

export { LinkElement };
