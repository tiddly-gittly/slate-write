/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { elementBuilders, element } from './element';
import { text } from './text';

export const builders = {
  element,
  ...elementBuilders,
  text,
};
export type IBuilders = typeof builders;
