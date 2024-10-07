import { SlateEditor } from '@udecode/plate-core';
import type { ValueOf } from '@udecode/slate';
import type { IWikiASTNode } from 'tiddlywiki';
import { wikiAstFromSlateAst } from 'wikiast-util-from-slate-plate-ast';
import { wikiAstFromWikiText } from 'wikiast-util-from-wikitext';
import { wikiAstToSlateAst } from 'wikiast-util-to-slate-plate-ast';
import { wikiAstToWikiText } from 'wikiast-util-to-wikitext';

export function serialize(value: ValueOf<SlateEditor>): string {
  const wikiAst = wikiAstFromSlateAst(value);
  const shouldAddTailingN = wikiAst.length > 1 && (wikiAst.at(-1) as IWikiASTNode | undefined)?.isBlock === true;
  return wikiAstToWikiText(wikiAst, { extraTailingNCount: shouldAddTailingN ? 1 : 0 });
}

export function deserialize(input: string, options?: { idCreator?: () => string }): ValueOf<SlateEditor> {
  // there won't be orphan text in real cases, so the type is actually TElement
  return wikiAstToSlateAst(wikiAstFromWikiText(input), options) as unknown as ValueOf<SlateEditor>;
}
