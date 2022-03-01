import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type InlineMath = ReturnType<typeof inlineMath>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function inlineMath(builders: IBuilders, { type, value }: mdast.InlineMath) {
  return {
    type,
    children: [{ text: value }],
  };
}
