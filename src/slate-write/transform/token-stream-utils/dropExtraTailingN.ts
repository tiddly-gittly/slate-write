import dropRightWhile from 'lodash/dropRightWhile';

/**
 * remove tailing \n
 *
 * We may have add extra \n when processing child tree, and those \n are too much after process the child
 * @param tokens
 * @returns
 */
export function dropExtraTailingN(tokens: string[]): string[] {
  // our code will only generate \n or \n\n so no need to test more. Add more case when code generating more cases.
  const listWithoutNToken = dropRightWhile(tokens, (token) => token === '\n' || token === '\n\n');
  // we still need to remove \n from last token
  if (listWithoutNToken[listWithoutNToken.length - 1]?.endsWith?.('\n')) {
    listWithoutNToken[listWithoutNToken.length - 1] = listWithoutNToken[listWithoutNToken.length - 1].slice(
      0,
      listWithoutNToken[listWithoutNToken.length - 1].length - 1,
    );
  }
  return listWithoutNToken;
}
