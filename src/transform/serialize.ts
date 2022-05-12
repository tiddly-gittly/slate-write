import { TNode } from '@udecode/plate';
import { Node } from 'slate';
import { wikiAstFromSlateAst } from './wikiast-util-from-slate-plate-ast';
import { wikiAstFromWikiText } from './wikiast-util-from-wikitext';
import { wikiAstToSlateAst } from './wikiast-util-to-slate-plate-ast';
import { wikiAstToWikiText } from './wikiast-util-to-wikitext';

export function serialize(value: TNode[]): string {
  const wikiAst = wikiAstFromSlateAst(value);
  const shouldAddTailingN = wikiAst.length > 1 && wikiAst[wikiAst.length - 1].isBlock === true;
  return wikiAstToWikiText(wikiAst, { extraTailingNCount: shouldAddTailingN ? 1 : 0 });
}

export function deserialize(input: string, options?: { idCreator?: () => string }): TNode[] {
  return wikiAstToSlateAst(wikiAstFromWikiText(input), options);
}
