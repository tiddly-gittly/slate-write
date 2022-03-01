import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Image = ReturnType<typeof image>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function image(builders: IBuilders, { type, url, title, alt }: mdast.Image) {
  return {
    type,
    url,
    title,
    alt,
    children: [{ text: '' }],
  };
}
