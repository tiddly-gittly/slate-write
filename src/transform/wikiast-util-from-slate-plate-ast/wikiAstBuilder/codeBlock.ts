import compact from 'lodash/compact';
import { CodeBlockNodeData, ELEMENT_CODE_LINE, TElement, TText } from '@udecode/plate';
import type { ICodeBlockParseTreeNode } from 'tiddlywiki';
import type { IBuilders } from '.';

export function codeBlock(builders: IBuilders, node: TElement<CodeBlockNodeData>): ICodeBlockParseTreeNode {
  const { children, lang } = node;
  const codeLines = compact(
    children.map((child: TElement): string | undefined | null => {
      if (child?.type === ELEMENT_CODE_LINE) {
        return (child.children?.[0] as TText | undefined)?.text;
      }
      return undefined;
    }),
  );
  const attributes: ICodeBlockParseTreeNode['attributes'] = {};
  if (lang !== undefined) {
    attributes.language = {
      type: 'string',
      value: lang,
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
