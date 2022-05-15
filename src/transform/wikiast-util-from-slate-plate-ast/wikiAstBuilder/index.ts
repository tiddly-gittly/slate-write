import { ELEMENT_CODE_BLOCK, ELEMENT_LIC } from '@udecode/plate';
import htmlTags from 'html-tags';

import { codeBlock } from './codeBlock';
import { element } from './element';
import { lic } from './lic';
import { text } from './text';
import { widget } from './widget';

/**
 * Key is `node.type`, value is node converter function.
 */
export const builders = {
  // auto parse basic element nodes
  // eslint-disable-next-line unicorn/prefer-object-from-entries
  ...(htmlTags as unknown as Array<keyof HTMLElementTagNameMap>).reduce<IElementBuilders>(
    (previousValue: IElementBuilders, currentValue: keyof HTMLElementTagNameMap) => {
      previousValue[currentValue] = element;
      return previousValue;
    },
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter, @typescript-eslint/consistent-type-assertions
    {} as IElementBuilders,
  ),
  [ELEMENT_CODE_BLOCK]: codeBlock,
  [ELEMENT_LIC]: lic,
  text,
  widget,
  macro: widget,
};

export type IBuilders = typeof builders;

type IElementBuilders = Record<keyof HTMLElementTagNameMap, typeof element>;
