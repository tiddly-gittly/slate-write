import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Html = ReturnType<typeof html>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function html(builders: IBuilders, { type, value }: mdast.HTML) {
  return {
    type,
    children: [{ text: value }],
  };
}
