import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Code = ReturnType<typeof code>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function code(builders: IBuilders, { type, value, lang, meta }: mdast.Code) {
  return {
    type,
    lang,
    meta,
    children: [{ text: value }],
  };
}
