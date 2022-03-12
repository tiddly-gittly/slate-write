/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Element, element } from './element';
import { Text, text } from './text';

export type SlateNode = Element | Text | Math;

export const builders = {
  element,
  text,
};
export type IBuilders = typeof builders;
