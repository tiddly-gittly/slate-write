import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Paragraph = ReturnType<typeof paragraph>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function paragraph(builders: IBuilders, { type, children }: mdast.Paragraph, deco: Decoration) {
  return {
    type,
    children: convertNodes(builders, children, deco),
  };
}
