import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Table = ReturnType<typeof table>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function table(builders: IBuilders, { type, children, align }: mdast.Table, deco: Decoration) {
  return {
    type,
    children: convertNodes(builders, children, deco),
    align,
  };
}
