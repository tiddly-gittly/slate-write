import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Link = ReturnType<typeof link>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function link(builders: IBuilders, { type, children, url, title }: mdast.Link, deco: Decoration) {
  return {
    type,
    children: convertNodes(builders, children, deco),
    url,
    title,
  };
}
