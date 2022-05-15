import type { ICustomParseTreeNode, IMacroCallParseTreeNode } from 'tiddlywiki';
import { IContext } from '..';

/** the `<<xxx >>` or the `<$macrocall $name="xxx"` */
export function macrocall(context: IContext, node: IMacroCallParseTreeNode): string[] {
  const { name, params, tag } = node;
  // <$macrocall widget is parsed with type `macrocall` too
  if (tag === '$macrocall') {
    return context.builders.widget(context, node as ICustomParseTreeNode);
  }
  if (name === undefined) return [];
  const parameterString = params?.flatMap((parameter) => context.builders[parameter.type]?.(context, parameter) ?? []).join(' ');
  return [`<<`, name, parameterString === undefined ? '' : ` ${parameterString}`, `>>`];
}
