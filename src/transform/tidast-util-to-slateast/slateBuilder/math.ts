import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Math = ReturnType<typeof math>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function math(builders: IBuilders, { type, value }: mdast.Math) {
  return {
    type,
    children: [{ text: value }],
  };
}
