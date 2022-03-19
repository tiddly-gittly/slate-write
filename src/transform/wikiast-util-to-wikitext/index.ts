import dropRightWhile from 'lodash/dropRightWhile';
import type { IParseTreeNode } from 'tiddlywiki';
import { builders, IBuilders } from './astSerializer';
import { convertNodes, convertOneNode } from './traverse';

export type IAnyBuilder = IBuilders & Record<string, typeof convertOneNode>;

/**
 * Wikitext is context aware, we need to know how current indentation is affected by the former code, and current list mode, etc.
 */
export interface IContext {
  /** Builders from node to text
   * Using dependency injection (pass-in via function parameter) to avoid circular dependency */
  builders: IAnyBuilder;
  /**
   * ul or ol will indent the following lines if they are inside other ul or ol, this counter variable tracks how much should we indent, it starts at -1, and may +1 for each ul or ol level before generating text (so it becomes 0 for the first ul or ol)
   */
  indentLevels: number;
  /** let li know it should use which symbol for list dot */
  listMode: 'ul' | 'ol' | undefined;
  marks: {
    code?: boolean;
    em?: boolean;
    strike?: boolean;
    strong?: boolean;
    sub?: boolean;
    sup?: boolean;
    u?: boolean;
  };
}
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const defaultContext = {
  builders,
  indentLevels: -1,
  listMode: undefined,
  marks: {},
} as IContext;

export function wikiAstToWikiText(input: IParseTreeNode | IParseTreeNode[]): string {
  const lines = convertNodes(defaultContext, Array.isArray(input) ? input : [input]);
  // remove tailing \n
  return dropRightWhile(lines, (line) => line === '\n' || line === '\n\n').join('');
}
