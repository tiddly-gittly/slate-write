import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Text = ReturnType<typeof text>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function text(builders: IBuilders, text: string, deco: Decoration) {
  return {
    ...deco,
    text,
  };
}
