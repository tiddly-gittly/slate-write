import { FormattedText } from '../../../../src/components/editor';
import type { ITextParseTreeNode } from 'tiddlywiki';
import { IBuilders } from '.';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function text(builders: IBuilders, text: FormattedText): ITextParseTreeNode {
  return {
    type: 'text',
    ...text,
  };
}
