import type { IDomParseTreeNode } from 'tiddlywiki';
import { IContext } from '../..';
import { convertNodes } from '../../traverse';

const markTypeMap = {
  strong: `''`,
  em: '//',
  u: '__',
  strike: '~~',
  code: '`',
  sup: '^^',
  sub: ',,',
} as const;
const markTypes = Object.keys(markTypeMap) as Array<keyof typeof markTypeMap>;

type IToggleMarkFunction = (context: IContext, node: IDomParseTreeNode) => string[];

export function toggleMarkFactory(markType: keyof IContext['marks']): IToggleMarkFunction {
  function toggleMark(context: IContext, node: IDomParseTreeNode): string[] {
    const alreadyHaveMark = context.marks[markType] ?? false;
    context.marks[markType] = true;
    const result = convertNodes(context, node.children);
    if (!alreadyHaveMark) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete context.marks[markType];
    }
    return [`${markTypeMap[markType]}${result.join('')}${markTypeMap[markType]}`];
  }
  return toggleMark;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const marks = {} as Record<keyof typeof markTypeMap, IToggleMarkFunction>;
for (const markType of markTypes) {
  marks[markType] = toggleMarkFactory(markType);
}
