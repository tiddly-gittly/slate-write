'use client';

import { Resizable as ResizablePrimitive, ResizeHandle as ResizeHandlePrimitive } from '@udecode/plate-resizable';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ComponentProps } from 'react';

import { cn } from 'src/slate-write/editor/lib/utils';

export const mediaResizeHandleVariants = cva(
  cn(
    'top-0 flex w-6 select-none flex-col justify-center',
    'after:flex after:h-16 after:w-[3px] after:rounded-[6px] after:bg-slate-400 after:opacity-0 after:content-[_] group-hover:after:opacity-100 dark:after:bg-slate-800',
  ),
  {
    variants: {
      direction: {
        left: '-left-3 -ml-3 pl-3',
        right: '-right-3 -mr-3 items-end pr-3',
      },
    },
  },
);

const resizeHandleVariants = cva(cn('absolute z-40'), {
  variants: {
    direction: {
      left: 'h-full cursor-col-resize',
      right: 'h-full cursor-col-resize',
      top: 'w-full cursor-row-resize',
      bottom: 'w-full cursor-row-resize',
    },
  },
});

const ResizeHandle = React.forwardRef<
  React.ElementRef<typeof ResizeHandlePrimitive>,
  & ComponentProps<typeof ResizeHandlePrimitive>
  & Omit<VariantProps<typeof resizeHandleVariants>, 'direction'>
>(({ className, ...props }, reference) => (
  <ResizeHandlePrimitive
    ref={reference}
    className={cn(
      resizeHandleVariants({ direction: props.options?.direction }),
      className,
    )}
    {...props}
  />
));
ResizeHandle.displayName = 'ResizeHandle';

const resizableVariants = cva('', {
  variants: {
    align: {
      left: 'mr-auto',
      center: 'mx-auto',
      right: 'ml-auto',
    },
  },
});

const Resizable = React.forwardRef<
  React.ElementRef<typeof ResizablePrimitive>,
  & ComponentProps<typeof ResizablePrimitive>
  & VariantProps<typeof resizableVariants>
>(({ className, align, ...props }, reference) => (
  <ResizablePrimitive
    ref={reference}
    className={cn(resizableVariants({ align }), className)}
    {...props}
  />
));
Resizable.displayName = 'Resizable';

export { Resizable, ResizeHandle };
