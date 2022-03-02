import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
import { text } from './text';
export type InlineCode = ReturnType<typeof inlineCode>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function inlineCode(builders: IBuilders, value: string, deco: Decoration) {
  return text(builders, { type: 'text', text: value }, { ...deco, inlineCode: true });
}
