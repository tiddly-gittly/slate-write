'use client';

import { useMarkToolbarButton, useMarkToolbarButtonState } from '@udecode/plate-utils';
import { ToolbarButton, ToolbarButtonProps } from './toolbar';

export interface MarkToolbarButtonProps extends Pick<ToolbarButtonProps, 'tooltip' | 'children'> {
  clear?: string | string[];
  nodeType: string;
}

/**
 * Toolbar button to toggle the mark of the leaves in selection.
 */
export function MarkToolbarButton({
  clear,
  nodeType,
  ...props
}: MarkToolbarButtonProps) {
  const state = useMarkToolbarButtonState({ clear, nodeType });
  const { props: buttonProps } = useMarkToolbarButton(state);

  return <ToolbarButton {...buttonProps} {...props} />;
}
