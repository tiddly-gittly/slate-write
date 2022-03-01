import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type FootnoteDefinition = ReturnType<typeof footnoteDefinition>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function footnoteDefinition(builders: IBuilders, { type, children, identifier, label }: mdast.FootnoteDefinition, deco: Decoration) {
  return {
    type,
    children: convertNodes(builders, children, deco),
    identifier,
    label,
  };
}
