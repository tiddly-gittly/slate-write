import { ELEMENT_LINK } from '@udecode/plate';
import { getPluginType, PlateEditor, wrapNodes } from '@udecode/plate-core';
import { Location } from 'slate';

/**
 * Wrap selected nodes with a link and collapse at the end.
 */
export const wrapLink = <T = {}>(editor: PlateEditor<T>, { at, url }: { at?: Location; url: string }) => {
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
