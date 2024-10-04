'use client';

import * as React from 'react';
import { useCallback, useState } from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import {
  cn,
  createPrimitiveElement,
  withCn,
  withProps,
  withRef,
  withVariants,
} from '@udecode/cn';
import { cva } from 'class-variance-authority';

import { Icons } from 'src/slate-write/editor/components/icons';

export const DropdownMenu = DropdownMenuPrimitive.Root;

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuSubTrigger = withRef<
  typeof DropdownMenuPrimitive.SubTrigger,
  {
    inset?: boolean;
  }
>(({ children, className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-slate-100 data-[state=open]:bg-slate-100 dark:focus:bg-slate-800 dark:data-[state=open]:bg-slate-800',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <Icons.chevronRight className='ml-auto size-4' />
  </DropdownMenuPrimitive.SubTrigger>
));

export const DropdownMenuSubContent = withCn(
  DropdownMenuPrimitive.SubContent,
  'z-50 min-w-32 overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50'
);

const DropdownMenuContentVariants = withProps(DropdownMenuPrimitive.Content, {
  className: cn(
    'z-50 min-w-32 overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50'
  ),
  sideOffset: 4,
});

export const DropdownMenuContent = withRef<
  typeof DropdownMenuPrimitive.Content
>(({ ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuContentVariants ref={ref} {...props} />
  </DropdownMenuPrimitive.Portal>
));

const menuItemVariants = cva(
  cn(
    'relative flex h-9 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
    'focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50'
  ),
  {
    variants: {
      inset: {
        true: 'pl-8',
      },
    },
  }
);

export const DropdownMenuItem = withVariants(
  DropdownMenuPrimitive.Item,
  menuItemVariants,
  ['inset']
);

export const DropdownMenuCheckboxItem = withRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>(({ children, className, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50',
      'cursor-pointer',
      className
    )}
    {...props}
  >
    <span className='absolute left-2 flex size-3.5 items-center justify-center'>
      <DropdownMenuPrimitive.ItemIndicator>
        <Icons.check className='size-4' />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));

export const DropdownMenuRadioItem = withRef<
  typeof DropdownMenuPrimitive.RadioItem,
  {
    hideIcon?: boolean;
  }
>(({ children, className, hideIcon, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex select-none items-center rounded-sm pl-8 pr-2 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50',
      'h-9 cursor-pointer px-2 data-[state=checked]:bg-slate-100 data-[state=checked]:text-slate-900 dark:data-[state=checked]:bg-slate-800 dark:data-[state=checked]:text-slate-50',
      className
    )}
    {...props}
  >
    {!hideIcon && (
      <span className='absolute right-2 flex size-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <Icons.check className='size-4' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
    )}
    {children}
  </DropdownMenuPrimitive.RadioItem>
));

const dropdownMenuLabelVariants = cva(
  cn('select-none px-2 py-1.5 text-sm font-semibold'),
  {
    variants: {
      inset: {
        true: 'pl-8',
      },
    },
  }
);

export const DropdownMenuLabel = withVariants(
  DropdownMenuPrimitive.Label,
  dropdownMenuLabelVariants,
  ['inset']
);

export const DropdownMenuSeparator = withCn(
  DropdownMenuPrimitive.Separator,
  '-mx-1 my-1 h-px bg-slate-100 dark:bg-slate-800'
);

export const DropdownMenuShortcut = withCn(
  createPrimitiveElement('span'),
  'ml-auto text-xs tracking-widest opacity-60'
);

export const useOpenState = () => {
  const [open, setOpen] = useState(false);

  const onOpenChange = useCallback(
    (_value = !open) => {
      setOpen(_value);
    },
    [open]
  );

  return {
    open,
    onOpenChange,
  };
};
