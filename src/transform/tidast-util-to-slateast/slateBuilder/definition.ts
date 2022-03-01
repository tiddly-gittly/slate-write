import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Definition = ReturnType<typeof definition>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function definition(builders: IBuilders, { type, identifier, label, url, title }: mdast.Definition) {
  return {
    type,
    identifier,
    label,
    url,
    title,
    children: [{ text: '' }],
  };
}
