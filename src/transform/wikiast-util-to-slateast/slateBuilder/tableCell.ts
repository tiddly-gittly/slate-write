import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type TableCell = ReturnType<typeof tableCell>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function tableCell(builders: IBuilders, { type, children }: mdast.TableCell, deco: Decoration) {
  return {
    type,
    children: convertNodes(builders, children, deco),
  };
}
