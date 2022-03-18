/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { element } from './element';
import { text } from './text';

export const builders = {
  element,
  text,
};
export type IBuilders = typeof builders;
