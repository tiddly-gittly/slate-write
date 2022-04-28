import { AnyObject, TNode } from '@udecode/plate';
import { Node } from 'slate';
import { wikiAstFromSlateAst } from './wikiast-util-from-slate-plate-ast';
import { wikiAstFromWikiText } from './wikiast-util-from-wikitext';
import { wikiAstToSlateAst } from './wikiast-util-to-slate-plate-ast';
import { wikiAstToWikiText } from './wikiast-util-to-wikitext';

export function serialize(value: Array<TNode<AnyObject>>): string {
  const wikiAst = wikiAstFromSlateAst(value);
  const shouldAddTailingN = wikiAst.length > 1 && wikiAst[wikiAst.length - 1].isBlock === true;
  return wikiAstToWikiText(wikiAst, { extraTailingNCount: shouldAddTailingN ? 1 : 0 });
}

export function deserialize(input: string): Array<TNode<AnyObject>> {
  return wikiAstToSlateAst(wikiAstFromWikiText(input));
}
