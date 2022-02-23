import { Descendant, Node } from 'slate';

export function serialize(value: Descendant[]) {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join('\n')
  );
}

export function deserialize(input: string) {
  return input.split('\n').map((line) => {
    return {
      children: [{ text: line }],
    };
  });
}
