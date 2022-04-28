import { TElement } from '@udecode/plate';
import type { IParseTreeNode } from 'tiddlywiki';

import { ELEMENT_WIDGET } from '../../../config/plugins/widget';
import { IContext } from '..';

/**
 * Render result as TW widget, instead of pure React component.
 */
export function widget(context: IContext, node: IParseTreeNode): TElement<{ node: IParseTreeNode }> {
  return {
    node,
    type: ELEMENT_WIDGET,
    isElement: true,
    isVoid: true,
    children: [{ text: '' }],
  };
}
