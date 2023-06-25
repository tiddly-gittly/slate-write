import { IWikiASTNode } from 'tiddlywiki';

/**
 * Some information to tell wikiast-util-from-slate-plate-ast how to restore previous type
 */
export interface ISlateAstExtraTwMarkers {
  attributes?: IWikiASTNode['attributes'];
  orderedAttributes?: IWikiASTNode['orderedAttributes'];
  'tw-type': string;
}
