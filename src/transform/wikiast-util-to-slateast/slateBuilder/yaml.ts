import * as mdast from '../../mdast';
import { convertNodes } from '../traverse';
import { IBuilders, Decoration } from '.';
export type Yaml = ReturnType<typeof yaml>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function yaml(builders: IBuilders, { type, value }: mdast.YAML) {
  return {
    type,
    children: [{ text: value }],
  };
}
