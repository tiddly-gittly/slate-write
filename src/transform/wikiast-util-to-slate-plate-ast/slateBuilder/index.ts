/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { element } from './element';
import { text } from './text';
import { link } from './link';
import { widget } from './widget';
import { macro } from './macro';
import { codeblock } from './codeblock';
import { set } from './set';

export const builders = {
  element,
  text,
  link,
  codeblock,
  /**
   * We render most tw widgets using tw-react
   */
  widget,
  image: widget,
  tiddler: widget,
  macrocall: macro,
  set,
};
export type IBuilders = typeof builders;
