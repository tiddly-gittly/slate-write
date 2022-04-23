import { AnyObject, TNode } from '@udecode/plate';
import { Node } from 'slate';
import { wikiAstFromSlateAst } from './wikiast-util-from-slate-plate-ast';
import { wikiAstFromWikiText } from './wikiast-util-from-wikitext';
import { wikiAstToSlateAst } from './wikiast-util-to-slate-plate-ast';
import { wikiAstToWikiText } from './wikiast-util-to-wikitext';

export function serialize(value: Array<TNode<AnyObject>>): string {
  return wikiAstToWikiText(wikiAstFromSlateAst(value));
}

export function deserialize(input: string): Array<TNode<AnyObject>> {
  return wikiAstToSlateAst(wikiAstFromWikiText(input));
}
