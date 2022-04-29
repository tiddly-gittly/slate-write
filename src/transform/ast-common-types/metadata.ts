import { IWikiASTNode } from 'tiddlywiki';

/**
 * Some information to tell wikiast-util-from-slate-plate-ast how to restore previous type
 */
export interface ISlateAstExtraTwMarkers {
  'tw-type': string;
  attributes?: IWikiASTNode['attributes'];
  orderedAttributes?: IWikiASTNode['orderedAttributes'];
}
