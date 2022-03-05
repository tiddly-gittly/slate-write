import { Descendant, Node } from 'slate';
import { wikiAstFromSlateAst } from './wikiast-util-from-slateast';
import { wikiAstFromWikiText } from './wikiast-util-from-wikitext';
import { wikiAstToSlateAst } from './wikiast-util-to-slateast';
import { wikiAstToWikiText } from './wikiast-util-to-wikitext';

export function serialize(value: Descendant[]): string {
  return wikiAstToWikiText(wikiAstFromSlateAst(value));
}

export function deserialize(input: string): Node[] {
  return wikiAstToSlateAst(wikiAstFromWikiText(input));
}
