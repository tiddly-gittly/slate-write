import { ELEMENT_LIC } from '@udecode/plate-list';
import htmlTags from 'html-tags';

import { codeblock } from './codeblock';
import { element } from './element';
import { lic } from './lic';
import { text } from './text';
import { widget } from './widget';
import { ELEMENT_CODE_BLOCK } from '../../../editor/plugins/codeblock/constants';

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
  [ELEMENT_CODE_BLOCK]: codeblock,
  [ELEMENT_LIC]: lic,
  text,
  widget,
  macro: widget,
};

export type IBuilders = typeof builders;

type IElementBuilders = Record<keyof HTMLElementTagNameMap, typeof element>;
