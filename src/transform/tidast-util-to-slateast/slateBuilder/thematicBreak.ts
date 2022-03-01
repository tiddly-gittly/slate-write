import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type ThematicBreak = ReturnType<typeof thematicBreak>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function thematicBreak(builders: IBuilders, { type }: mdast.ThematicBreak) {
  return {
    type,
    children: [{ text: '' }],
  };
}
