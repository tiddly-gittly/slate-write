/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { getPluginType, someNode, useEventPlateId, usePlateEditorState, withPlateEventProvider } from '@udecode/plate-core';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { ToolbarButton, ToolbarButtonProps } from '@udecode/plate-ui-toolbar';
import React from 'react';
import { getAndUpsertLink } from './transforms/getAndUpsertLink';

export interface LinkToolbarButtonProps extends ToolbarButtonProps {
  /**
   * Default onMouseDown is getting the link url by calling this promise before inserting the image.
   */
  getLinkUrl?: (previousUrl: string | null) => Promise<string | null> | string | null;
}

export const LinkToolbarButton = withPlateEventProvider(({ id, getLinkUrl, ...props }: LinkToolbarButtonProps) => {
  id = useEventPlateId(id);
  const editor = usePlateEditorState(id)!;

  const type = getPluginType(editor, ELEMENT_LINK);
  const isLink = !(editor?.selection === undefined) && someNode(editor, { match: { type } });

  return (
    <ToolbarButton
      active={isLink}
      onMouseDown={(event) => {
        if (!editor) return;

        event.preventDefault();
        void getAndUpsertLink(editor, getLinkUrl);
      }}
      {...props}
    />
  );
});
