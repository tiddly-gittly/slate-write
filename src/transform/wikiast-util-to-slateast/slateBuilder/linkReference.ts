import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type LinkReference = ReturnType<typeof linkReference>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function linkReference(builders: IBuilders, { type, children, referenceType, identifier, label }: mdast.LinkReference, deco: Decoration) {
  return {
    type,
    children: convertNodes(builders, children, deco),
    referenceType,
    identifier,
    label,
  };
}
