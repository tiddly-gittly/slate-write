import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Footnote = ReturnType<typeof footnote>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function footnote(builders: IBuilders, { type, children }: mdast.Footnote, deco: Decoration) {
  return {
    type,
    children: convertNodes(builders, children, deco),
  };
}
