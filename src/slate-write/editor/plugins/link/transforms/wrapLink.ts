import { getPluginType, PlateEditor } from '@udecode/plate-core';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { Value } from '@udecode/slate';
import { Location, wrapNodes } from 'slate';

/**
 * Wrap selected nodes with a link and collapse at the end.
 */
export const wrapLink = <V extends Value>(editor: PlateEditor<V>, { at, url }: { at?: Location; url: string }): void => {
  wrapNodes(
    editor,
    {
      type: getPluginType(editor, ELEMENT_LINK),
      url,
      children: [],
      'tw-type': 'link',
    },
    { at, split: true },
  );
};
