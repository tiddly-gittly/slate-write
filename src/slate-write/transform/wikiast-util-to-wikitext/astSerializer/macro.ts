import type { IMacroParseTreeNode, IParseTreeAttribute } from 'tiddlywiki';
import { IContext } from '..';

/**
 * This is a parameter type
 * In a macrocall widget's param, see rpn example
 * 
 * ```js
 * a: {
    start: 23,
    name: 'a',
    type: 'macro',
    value: {
      type: 'macrocall',
      start: 26,
      params: [
        {
          type: 'macro-parameter',
          start: 31,
          value: '2',
          end: 33,
        },
        {
          type: 'macro-parameter',
          start: 33,
          value: '2',
          end: 35,
        },
        {
          type: 'macro-parameter',
          start: 35,
          value: '*',
          end: 37,
        },
      ],
      name: 'rpn',
      end: 39,
    },
    end: 39,
  }
  ```
 */
export function macro(context: IContext, node: IMacroParseTreeNode | IParseTreeAttribute): string[] {
  if (typeof node.value === 'string') return [node.value];
  const macroType = node.value?.type;
  // basically is calling `macrocall` builder
  return macroType in context.builders ? context.builders[macroType](context, node.value) : [];
}
