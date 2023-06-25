/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
  const parameterString = params
    ?.flatMap((parameter) => {
      const parameterKeyString = parameter.name ? `${parameter.name}:` : '';
      const parameterValues = context.builders[parameter.type]?.(context, parameter) ?? [];
      return parameterValues.map((text) => (text.includes(' ') ? `"${text}"` : text)).map((value) => `${parameterKeyString}${value}`);
    })
    .join(' ');
  return [`<<`, name, parameterString === undefined ? '' : ` ${parameterString}`, `>>`];
}
