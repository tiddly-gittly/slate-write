/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { findNode, FindNodeOptions, getPluginType, PlateEditor, Value } from '@udecode/plate-core';
import { ELEMENT_AUTO_COMPLETE_INPUT } from '../createAutoCompletePlugin';
import { TAutoCompleteInputElement } from '../types';

export const findAutoCompleteInput = <V extends Value>(editor: PlateEditor<V>, options?: Omit<FindNodeOptions<V>, 'match'>) =>
  findNode<TAutoCompleteInputElement>(editor, {
    ...options,
    match: { type: getPluginType(editor, ELEMENT_AUTO_COMPLETE_INPUT) },
  });
