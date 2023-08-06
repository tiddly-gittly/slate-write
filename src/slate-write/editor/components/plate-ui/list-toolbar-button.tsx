import { ELEMENT_UL, useListToolbarButton, useListToolbarButtonState } from '@udecode/plate-list';

import { FormatListBulleted } from '@styled-icons/material/FormatListBulleted';
import { FormatListNumbered } from '@styled-icons/material/FormatListNumbered';
import { ToolbarButton } from './toolbar';

export function ListToolbarButton({
  nodeType = ELEMENT_UL,
}: {
  nodeType?: string;
}) {
  const state = useListToolbarButtonState({ nodeType });
  const { props } = useListToolbarButton(state);

  return (
    <ToolbarButton
      tooltip={nodeType === ELEMENT_UL ? 'UnorderedList (-) (*)' : 'OrderedList (#) (1.)'}
      {...props}
    >
      {nodeType === ELEMENT_UL ? <FormatListBulleted /> : <FormatListNumbered />}
    </ToolbarButton>
  );
}
