import { TElement } from '@udecode/plate-core';
import type { ICustomParseTreeNode } from 'tiddlywiki';

import { ELEMENT_SET } from '../../../editor/plugins/set';
import { convertNodes } from '../traverse';
import { IContext } from '..';

/**
 * Render result as TW macrocall, and a dot that open a code editor on click.
 *
 * Set widget's children should gets rendered in its context, not like other widget, will handled all content's render.
 */
export function set(context: IContext, node: ICustomParseTreeNode): TElement & { node: ICustomParseTreeNode } {
  // set node may have entire tiddler content as its children (because it provides context for the whole tiddler). We don't want the node to be too big, so get rid of children info here.
  const { children, ...nodeWithoutChildren } = node;
  /** it may be `<$set` widget
   * // TODO: prove this work, I'm not sure we can restore the children info when compile back.
   */
  if ('tag' in node) {
    return {
      ...context.builders.widget(context, nodeWithoutChildren),
      children: convertNodes(context, children) as TElement[],
    };
  }
  // pass all information to the react renderer, and do things there.
  return {
    node: nodeWithoutChildren,
    type: ELEMENT_SET,
    isElement: true,
    isVoid: true,
    children: convertNodes(context, children) as TElement[],
  };
}
