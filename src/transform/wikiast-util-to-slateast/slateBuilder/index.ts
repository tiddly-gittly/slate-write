/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Html, html } from './html';
import { Text, text } from './text';

export type SlateNode = Html | Text | Math;

export const builders = {
  element: html,
  text,
};
export type IBuilders = typeof builders;
