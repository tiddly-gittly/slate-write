'use client';

import * as React from 'react';

import type { DialogProps } from '@radix-ui/react-dialog';

import { cn, createPrimitiveElement, withCn, withRef } from '@udecode/cn';
import { Command as CommandPrimitive } from 'cmdk';

import { Icons } from '@/components/icons';

import { Dialog, DialogContent } from './dialog';

export const Command = withCn(
  CommandPrimitive,
  'flex size-full flex-col overflow-hidden rounded-md bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50'
);

export function CommandDialog({ children, ...props }: DialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent className='overflow-hidden p-0 shadow-lg'>
        <Command className='[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5 dark:[&_[cmdk-group-heading]]:text-slate-400'>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export const CommandInput = withRef<typeof CommandPrimitive.Input>(
  ({ className, ...props }, ref) => (
    <div className='flex items-center border-b px-3' cmdk-input-wrapper=''>
      <Icons.search className='mr-2 size-4 shrink-0 opacity-50' />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400',
          className
        )}
        {...props}
      />
    </div>
  )
);

export const CommandList = withCn(
  CommandPrimitive.List,
  'max-h-[500px] overflow-y-auto overflow-x-hidden'
);

export const CommandEmpty = withCn(
  CommandPrimitive.Empty,
  'py-6 text-center text-sm'
);

export const CommandGroup = withCn(
  CommandPrimitive.Group,
  'overflow-hidden p-1 text-slate-950 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 dark:text-slate-50 dark:[&_[cmdk-group-heading]]:text-slate-400'
);

export const CommandSeparator = withCn(
  CommandPrimitive.Separator,
  '-mx-1 h-px bg-slate-200 dark:bg-slate-800'
);

export const CommandItem = withCn(
  CommandPrimitive.Item,
  'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-slate-100 data-[selected=true]:text-slate-900 data-[disabled=true]:opacity-50 dark:data-[selected=true]:bg-slate-800 dark:data-[selected=true]:text-slate-50'
);

export const CommandShortcut = withCn(
  createPrimitiveElement('span'),
  'ml-auto text-xs tracking-widest text-slate-500 dark:text-slate-400'
);
