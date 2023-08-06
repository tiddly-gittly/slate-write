/* eslint-disable unicorn/no-null */
import { useFloatingToolbar, UseVirtualFloatingOptions } from '@udecode/plate-floating';
import { PortalBody } from '@udecode/plate-utils';
import { ReactNode } from 'react';

import { cn } from 'src/slate-write/editor/lib/utils';

import { Toolbar, ToolbarProps } from './toolbar';

export interface FloatingToolbarProps extends ToolbarProps {
  children: ReactNode;

  floatingOptions?: UseVirtualFloatingOptions;

  hideToolbar?: boolean;

  ignoreReadOnly?: boolean;

  portalElement?: Element;
}

export function FloatingToolbar({
  portalElement,
  floatingOptions,
  ignoreReadOnly,
  hideToolbar,
  children,
  ...props
}: FloatingToolbarProps) {
  const { refs, style, open } = useFloatingToolbar({
    floatingOptions,
    ignoreReadOnly,
    hideToolbar,
  });

  if (!open) return null;

  return (
    <PortalBody element={portalElement}>
      <Toolbar
        className={cn(
          'absolute z-200 whitespace-nowrap border border-slate-200 bg-white px-1 opacity-100 shadow-md dark:border-slate-800 dark:bg-slate-950',
        )}
        ref={refs.setFloating}
        style={style}
        {...props}
      >
        {children}
      </Toolbar>
    </PortalBody>
  );
}
