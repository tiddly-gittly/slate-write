import type { ICustomParseTreeNode } from 'tiddlywiki';
import { IContext } from '..';
import { convertNodes } from '../traverse';

/**
 * 
 * ```json
 * {
    "type": "list",
    "start": 0,
    "attributes": {
      "filter": {
        "start": 6,
        "name": "filter",
        "type": "string",
        "value": "[tag[ExampleTag]sort[title]]",
        "end": 44
      }
    },
    "orderedAttributes": [
      {
        "start": 6,
        "name": "filter",
        "type": "string",
        "value": "[tag[ExampleTag]sort[title]]",
        "end": 44
      }
    ],
    "tag": "$list",
    "isSelfClosing": true,
    "end": 46,
    "isBlock": false
  }
    ```
 */
export function widget(context: IContext, node: ICustomParseTreeNode): string[] {
  const { tag, isSelfClosing, orderedAttributes, attributes, isBlock, children } = node;
  /** list of attributes, prevent `orderedAttributes` or `attributes` to be undefined */
  const attributeList = orderedAttributes ? orderedAttributes : attributes ? Object.keys(attributes).map((key) => attributes[key]) : [];
  const jsxResult = isSelfClosing
    ? [`<${tag} ${attributeList.map(({ name, value }) => `${name}="${value}"`).join(' ')}/>`]
    : [`<${tag} ${attributeList.map(({ name, value }) => `${name}="${value}"`).join(' ')}>`, ...convertNodes(context, children), `</${tag}>`];
  // block level texts are separated with \n
  return isBlock ? [...jsxResult, '\n'] : jsxResult;
}
