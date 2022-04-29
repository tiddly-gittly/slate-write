/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { elementBuilders, element } from './element';
import { text } from './text';
import { link } from './link';
import { jsx } from './jsx';
import { image } from './image';
import { tiddler } from './transclude';
import { widget } from './widget';

export const builders = {
  element,
  ...elementBuilders,
  text,
  image,
  tiddler,
  link,
  jsx,
  widget,
};
export type IBuilders = typeof builders;
