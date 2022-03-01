import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type ListItem = ReturnType<typeof listItem>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function listItem(builders: IBuilders, { type, children, checked, spread }: mdast.ListItem, deco: Decoration) {
  return {
    type,
    children: convertNodes(builders, children, deco),
    checked,
    spread,
  };
}
