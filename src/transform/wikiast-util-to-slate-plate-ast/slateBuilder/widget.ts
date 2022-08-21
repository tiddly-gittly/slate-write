import { TElement } from '@udecode/plate-core';
import type { ICustomParseTreeNode } from 'tiddlywiki';

import { ELEMENT_WIDGET } from '../../../editor/plugins/widget';
import { IContext } from '..';

/**
 * Render result as TW widget, instead of pure React component.
 */
export function widget(context: IContext, node: ICustomParseTreeNode): TElement & { node: ICustomParseTreeNode } {
  return {
    node,
    type: ELEMENT_WIDGET,
    isElement: true,
    isVoid: true,
    children: [{ text: '' }],
  };
}
