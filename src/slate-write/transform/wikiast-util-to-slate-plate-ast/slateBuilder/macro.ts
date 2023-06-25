import { TElement } from '@udecode/plate-core';
import type { ICustomParseTreeNode } from 'tiddlywiki';

import { ELEMENT_MACRO } from '../../../editor/plugins/macro';
import { IContext } from '..';

/**
 * Render result as TW macrocall, instead of pure React component.
 */
export function macro(context: IContext, node: ICustomParseTreeNode): TElement & { node: ICustomParseTreeNode } {
  /** it may be `<$macrocall` widget */
  if ('tag' in node) {
    return context.builders.widget(context, node);
  }
  return {
    node,
    type: ELEMENT_MACRO,
    isElement: true,
    isVoid: true,
    children: [{ text: '' }],
  };
}
