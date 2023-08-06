/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/prop-types */
'use client';

import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ReactNode } from 'react';

import { cn } from 'src/slate-write/editor/lib/utils';

import { ArrowDown } from '@styled-icons/foundation/ArrowDown';
import { Separator } from './separator';
import { ToggleProps, toggleVariants } from './toggle';
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from './tooltip';

const toolbarVariants = cva(
  'relative flex select-none items-stretch gap-1 bg-white dark:bg-slate-950',
);

export const linkVariants = cva('font-medium underline underline-offset-4');

const ToolbarToggleGroup = ToolbarPrimitive.ToggleGroup;

export interface ToolbarProps extends React.ComponentPropsWithoutRef<typeof Toolbar> {}

const Toolbar = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  & React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
  & VariantProps<typeof toolbarVariants>
>(({ className, ...props }, reference) => (
  <ToolbarPrimitive.Root
    ref={reference}
    className={cn(toolbarVariants(), className)}
    {...props}
  />
));
Toolbar.displayName = ToolbarPrimitive.Root.displayName;

const ToolbarLink = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Link>,
  & React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>
  & VariantProps<typeof linkVariants>
>(({ className, ...props }, reference) => (
  <ToolbarPrimitive.Link
    ref={reference}
    className={cn(linkVariants(), className)}
    {...props}
  />
));
ToolbarLink.displayName = ToolbarPrimitive.Link.displayName;

const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(({ className, ...props }, reference) => (
  <ToolbarPrimitive.Separator
    ref={reference}
    className={cn('shrink-0 bg-slate-200 dark:bg-slate-800', 'my-1 w-[1px]', className)}
    {...props}
  />
));
ToolbarSeparator.displayName = ToolbarPrimitive.Separator.displayName;

export interface ToolbarButtonProps extends React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>, VariantProps<typeof toggleVariants>, Omit<ToggleProps, 'type'> {
  buttonType?: 'button' | 'toggle';
  isDropdown?: boolean;
  pressed?: boolean;
  tooltip?: ReactNode;
}

const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Button>,
  ToolbarButtonProps
>(
  (
    {
      className,
      variant,
      size = 'sm',
      isDropdown,
      children,
      pressed,
      value,
      tooltip,
      ...props
    },
    reference,
  ) => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
      setIsLoaded(true);
    }, []);

    const content = typeof pressed === 'boolean'
      ? (
        <ToolbarToggleGroup
          type='single'
          value={pressed ? 'single' : undefined}
        >
          <ToolbarToggleItem
            ref={reference}
            className={cn(
              toggleVariants({
                variant,
                size,
              }),
              isDropdown && 'my-1 justify-between pr-1',
              className,
            )}
            value='single'
            {...props}
          >
            <div className='flex flex-1'>{children}</div>
            <div>
              {isDropdown && <ArrowDown className='ml-0.5 h-4 w-4' data-icon />}
            </div>
          </ToolbarToggleItem>
        </ToolbarToggleGroup>
      )
      : (
        <ToolbarPrimitive.Button
          ref={reference}
          className={cn(
            toggleVariants({
              variant,
              size,
            }),
            isDropdown && 'pr-1',
            className,
          )}
          {...props}
        >
          {children}
        </ToolbarPrimitive.Button>
      );

    return isLoaded && tooltip
      ? (
        <Tooltip>
          <TooltipTrigger>{content}</TooltipTrigger>

          <TooltipPortal>
            <TooltipContent>{tooltip}</TooltipContent>
          </TooltipPortal>
        </Tooltip>
      )
      : <>{content}</>;
  },
);
ToolbarButton.displayName = ToolbarPrimitive.Button.displayName;

const ToolbarToggleItem = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.ToggleItem>,
  & React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>
  & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, reference) => (
  <ToolbarPrimitive.ToggleItem
    ref={reference}
    className={cn(toggleVariants({ variant, size }), className)}
    {...props}
  />
));
ToolbarToggleItem.displayName = ToolbarPrimitive.ToggleItem.displayName;

const ToolbarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { noSeparator?: boolean }
>(({ noSeparator, className, children }, reference) => {
  const childArray = React.Children.map(children, (c) => c);
  if (!childArray || childArray.length === 0) return null;

  return (
    <div ref={reference} className={cn('flex', className)}>
      {!noSeparator && (
        <div className='h-full py-1'>
          <Separator orientation='vertical' />
        </div>
      )}

      <div className='mx-1 flex items-center gap-1'>{children}</div>
    </div>
  );
});
ToolbarGroup.displayName = 'ToolbarGroup';

export { Toolbar, ToolbarButton, ToolbarGroup, ToolbarLink, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem };
