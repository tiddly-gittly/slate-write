/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { html } from './html';
import { text } from './text';

export const builders = {
  element: html,
  text,
};
export type IBuilders = typeof builders;
