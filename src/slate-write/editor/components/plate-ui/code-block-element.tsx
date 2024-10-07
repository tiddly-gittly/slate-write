'use client';

import React from 'react';

import { cn, withRef } from '@udecode/cn';
import { useCodeBlockElementState } from '@udecode/plate-code-block/react';
import { PlateElement } from '@udecode/plate-common/react';

import { CodeBlockCombobox } from './code-block-combobox';

import './code-block-element.css';

export const CodeBlockElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const { element } = props;
    const state = useCodeBlockElementState({ element });

    return (
      <PlateElement
        ref={ref}
        className={cn('relative py-1', state.className, className)}
        {...props}
      >
        <pre className='overflow-x-auto rounded-md bg-slate-100 px-6 py-8 font-mono text-sm leading-[normal] [tab-size:2] dark:bg-slate-800'>
          <code>{children}</code>
        </pre>

        {state.syntax && (
          <div
            className='absolute right-2 top-2 z-10 select-none'
            contentEditable={false}
          >
            <CodeBlockCombobox />
          </div>
        )}
      </PlateElement>
    );
  }
);