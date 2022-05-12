import compact from 'lodash/compact';
import { ELEMENT_CODE_LINE, TElement, TText } from '@udecode/plate';
import type { ICodeBlockParseTreeNode } from 'tiddlywiki';
import type { IBuilders } from '.';

export function codeBlock(builders: IBuilders, node: TElement): ICodeBlockParseTreeNode {
  const { children, lang } = node;
  const codeLines = compact(
    children.map((child: TElement | TText): string | undefined | null => {
      if (child?.type === ELEMENT_CODE_LINE) {
        return ((child as TElement).children?.[0] as TText | undefined)?.text;
      }
      return undefined;
    }),
  );
  const attributes: ICodeBlockParseTreeNode['attributes'] = {};
  if (lang !== undefined) {
    attributes.language = {
      type: 'string',
      value: lang as string,
    };
  }
  if (codeLines.length > 0) {
    attributes.code = {
      type: 'string',
      value: codeLines.join('\n'),
    };
  }
  return {
    type: 'codeblock',
    attributes,
  };
}
