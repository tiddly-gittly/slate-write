import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Heading = ReturnType<typeof heading>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function heading(builders: IBuilders, { type, children, depth }: mdast.Heading, deco: Decoration) {
  return {
    type,
    depth,
    children: convertNodes(builders, children, deco),
  };
}
