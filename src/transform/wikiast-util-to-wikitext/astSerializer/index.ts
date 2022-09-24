/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { elementBuilders, element } from './element';
import { text } from './text';
import { link } from './link';
import { jsx } from './jsx';
import { image } from './image';
import { tiddler } from './transclude';
import { widget } from './widget';
import { macro } from './macro';
import { macrocall } from './macrocall';
import { set } from './set';
import { string } from './string';
import { codeblock } from './codeblock';

export const builders = {
  element,
  ...elementBuilders,
  text,
  image,
  tiddler,
  link,
  jsx,
  widget,
  macro,
  macrocall,
  set,
  string,
  codeblock,
  'macro-parameter': string,
  number: string,
  bigint: string,
  boolean: string,
};
export type IBuilders = typeof builders;
