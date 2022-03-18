import omit from 'lodash/omit';
import type { ITextParseTreeNode } from 'tiddlywiki';
import { IBuilders } from '.';
export type Text = ReturnType<typeof text>;

/** Slate node is compact, we need to filter out some keys from wikiast */
const textLevelKeysToOmit = ['type', 'start', 'end'];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function text(builders: IBuilders, text: ITextParseTreeNode) {
  return {
    ...omit(text, textLevelKeysToOmit),
  };
}