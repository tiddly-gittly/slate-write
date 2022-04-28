/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { elementBuilders, element } from './element';
import { text } from './text';
import { image } from './image';
import { tiddler } from './transclude';
import { widget } from './widget';

export const builders = {
  element,
  ...elementBuilders,
  text,
  image,
  tiddler,
  widget,
};
export type IBuilders = typeof builders;
