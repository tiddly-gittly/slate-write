import type { ITextParseTreeNode } from 'tiddlywiki';
import { IContext } from '..';

/**
 * The source tiddler is in the `type: 'tiddler', attributes: { tiddler: {type: 'string', value: 'favicon.ico',},}` part
 * And the transclude template part is its children with type `transclude`, same as the source tiddler if no template is used
 */
export function tiddler(context: IContext, node: ITextParseTreeNode): string[] {
  const source = node.attributes?.tiddler !== undefined ? node.attributes.tiddler.value : '';
  const templateName = node.children?.[0]?.attributes?.tiddler?.value;
  const templatePart = templateName !== undefined && templateName !== source ? `|${templateName}` : '';
  return [`{{${source}${templatePart}}}`];
}
