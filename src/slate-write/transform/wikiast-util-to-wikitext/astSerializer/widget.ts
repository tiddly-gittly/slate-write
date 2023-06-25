import type { ICustomParseTreeNode } from 'tiddlywiki';
import { IContext } from '..';

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
  const jsxResult = context.builders.jsx(context, node);
  return jsxResult;
}
