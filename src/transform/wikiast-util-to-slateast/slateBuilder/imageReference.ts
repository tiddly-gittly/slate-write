import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type ImageReference = ReturnType<typeof imageReference>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function imageReference(builders: IBuilders, { type, alt, referenceType, identifier, label }: mdast.ImageReference) {
  return {
    type,
    alt,
    referenceType,
    identifier,
    label,
    children: [{ text: '' }],
  };
}
