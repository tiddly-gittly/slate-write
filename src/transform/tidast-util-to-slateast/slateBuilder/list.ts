import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type List = ReturnType<typeof list>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function list(builders: IBuilders, { type, children, ordered, start, spread }: mdast.List, deco: Decoration) {
  return {
    type,
    children: convertNodes(builders, children, deco),
    ordered,
    start,
    spread,
  };
}
