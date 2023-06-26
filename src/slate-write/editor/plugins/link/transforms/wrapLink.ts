/* eslint-disable @typescript-eslint/consistent-type-assertions */
/**
 * Modified from plate's packages/nodes/link/src/transforms/wrapLink.ts
 */
import { getPluginType, PlateEditor } from '@udecode/plate-core';
import { ELEMENT_LINK, WrapLinkOptions } from '@udecode/plate-link';
import { Value, wrapNodes } from '@udecode/slate';

/**
 * Wrap selected nodes with a link and collapse at the end.
 */
export const wrapLink = <V extends Value>(editor: PlateEditor<V>, { url, target, ...options }: WrapLinkOptions<V>): void => {
  wrapNodes<any, V>(
    editor,
    {
      type: getPluginType(editor, ELEMENT_LINK),
      url,
      target,
      children: [],
      'tw-type': 'link',
    },
    { split: true, ...options },
  );
};
