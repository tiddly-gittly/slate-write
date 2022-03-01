import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type TableRow = ReturnType<typeof tableRow>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function tableRow(builders: IBuilders, { type, children }: mdast.TableRow, deco: Decoration) {
  return {
    type,
    children: convertNodes(builders, children, deco),
  };
}
