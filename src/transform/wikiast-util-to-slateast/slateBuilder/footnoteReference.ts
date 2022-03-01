import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type FootnoteReference = ReturnType<typeof footnoteReference>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function footnoteReference(builders: IBuilders, { type, identifier, label }: mdast.FootnoteReference) {
  return {
    type,
    identifier,
    label,
    children: [{ text: '' }],
  };
}
