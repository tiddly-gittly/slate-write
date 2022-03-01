import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Blockquote = ReturnType<typeof blockquote>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function blockquote(builders: IBuilders, { type, children }: mdast.Blockquote, deco: Decoration) {
  return {
    type,
    children: convertNodes(builders, children, deco),
  };
}
