import * as mdast from '../../mdast';
import * as slate from '../../slate';
import { slateNode } from '../traverse';
import { IBuilders, Decoration, SlateNode } from '.';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function mark(builders: IBuilders, { type, children }: mdast.Emphasis | mdast.Strong | mdast.Delete, deco: Decoration) {
  return children.reduce<slate.Node[]>((accumulator, n) => {
    accumulator.push(...slateNode(builders, n, { ...deco, [type]: true }));
    return accumulator;
  }, []);
}
