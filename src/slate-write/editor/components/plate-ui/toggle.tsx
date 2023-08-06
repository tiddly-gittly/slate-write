'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from 'src/slate-write/editor/lib/utils';

const toggleVariants = cva(
  cn(
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800',
    '[&_svg:not([data-icon])]:h-5 [&_svg:not([data-icon])]:w-5',
  ),
  {
    variants: {
      variant: {
        default:
          'bg-transparent hover:bg-slate-100 hover:text-slate-500 data-[state=on]:bg-slate-100 data-[state=on]:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-400 dark:data-[state=on]:bg-slate-800 dark:data-[state=on]:text-slate-50',
        outline: 'border border-slate-200 bg-transparent hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        floating: 'rounded-full bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2',
        lg: 'h-11 px-5',
        circle: 'p-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ToggleProps =
  & React.ComponentPropsWithoutRef<
    typeof TogglePrimitive.Root
  >
  & VariantProps<typeof toggleVariants>;

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size, ...props }, reference) => (
  <TogglePrimitive.Root
    ref={reference}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
