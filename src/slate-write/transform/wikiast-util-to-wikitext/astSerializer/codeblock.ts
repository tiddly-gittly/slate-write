import type { ICodeBlockParseTreeNode } from 'tiddlywiki';
import { IContext } from '..';

/**
 * This is a parameter type
 */
export function codeblock(context: IContext, node: ICodeBlockParseTreeNode): string[] {
  const language = node.attributes.language?.value ?? '';
  const code = node.attributes.code?.value ?? '';
  return [`\`\`\``, language, '\n', code, '\n', `\`\`\``];
}
