import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Toml = ReturnType<typeof toml>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function toml(builders: IBuilders, { type, value }: mdast.TOML) {
  return {
    type,
    children: [{ text: value }],
  };
}
