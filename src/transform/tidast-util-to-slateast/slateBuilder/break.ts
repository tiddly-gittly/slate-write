import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type LineBreak = ReturnType<typeof lineBreak>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function lineBreak(builders: IBuilders, { type }: mdast.Break) {
  return {
    type,
    children: [{ text: '' }],
  };
}
