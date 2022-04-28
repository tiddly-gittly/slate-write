/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { element } from './element';
import { text } from './text';
import { widget } from './widget';

export const builders = {
  element,
  text,
  /** 
   * We render most tw widgets using tw-react
   */
  widget,
  image: widget,
  tiddler: widget,
};
export type IBuilders = typeof builders;
