/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { elementBuilders, element } from './element';
import { text } from './text';
import { image } from './image';
import { tiddler } from './transclude';

export const builders = {
  element,
  ...elementBuilders,
  text,
  image,
  tiddler,
};
export type IBuilders = typeof builders;
