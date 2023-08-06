/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { getPluginType, useEventPlateId, usePlateEditorState, withPlateProvider } from '@udecode/plate-core';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { someNode } from '@udecode/slate';
import { ToolbarButton, ToolbarButtonProps } from '../../components/plate-ui/toolbar';
import { getAndUpsertLink } from './transforms/getAndUpsertLink';

export interface LinkToolbarButtonProps extends ToolbarButtonProps {
  /**
   * Default onMouseDown is getting the link url by calling this promise before inserting the image.
   */
  getLinkUrl?: (previousUrl: string | null) => Promise<string | null> | string | null;
}

export const LinkToolbarButton = withPlateProvider(({ id, getLinkUrl, ...props }: LinkToolbarButtonProps) => {
  id = String(useEventPlateId(id));
  const editor = usePlateEditorState(id)!;

  const type = getPluginType(editor, ELEMENT_LINK);
  const isLink = !(editor?.selection === undefined) && someNode(editor, { match: { type } });

  return (
    <ToolbarButton
      pressed={isLink}
      onMouseDown={(event) => {
        if (!editor) return;

        event.preventDefault();
        void getAndUpsertLink(editor, getLinkUrl);
      }}
      {...props}
    />
  );
});
