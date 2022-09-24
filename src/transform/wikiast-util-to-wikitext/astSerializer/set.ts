/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { ICustomParseTreeNode, IMacroCallParseTreeNode } from 'tiddlywiki';
import { convertNodes } from '../traverse';
import { IContext } from '..';

/** the `\define tags-of-current-tiddler() {{!!tags}}` or the `<$set name=animal value=zebra>` */
export function set(context: IContext, node: IMacroCallParseTreeNode): string[] {
  const { attributes, children, tag } = node;
  const childrenTexts = convertNodes(context, children);
  // <$set widget is parsed with type `set` too
  if (tag === '$set') {
    return [...context.builders.widget(context, node as ICustomParseTreeNode), ...childrenTexts];
  }
  if (attributes === undefined) return [];
  const name = (attributes?.name?.value as string) ?? '';
  const value = (attributes?.value?.value as string) ?? '';
  if (!name) return [];
  return [`\\define`, ' ', `${name}()`, ' ', value, '\n\n', ...childrenTexts];
}
