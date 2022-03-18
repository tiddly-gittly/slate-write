import { TText } from '@udecode/plate';
import type { ITextParseTreeNode } from 'tiddlywiki';
import { IBuilders } from '.';

export function text(builders: IBuilders, text: TText): ITextParseTreeNode {
  return {
    type: 'text',
    ...text,
  };
}
