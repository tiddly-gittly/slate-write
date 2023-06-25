/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getPluginType, PlateEditor } from '@udecode/plate-core';
import { findNode, FindNodeOptions, Value } from '@udecode/slate';
import { ELEMENT_AUTO_COMPLETE_INPUT } from '../createAutoCompletePlugin';
import { TAutoCompleteInputElement } from '../types';

export const findAutoCompleteInput = <V extends Value>(editor: PlateEditor<V>, options?: Omit<FindNodeOptions<V>, 'match'>) =>
  findNode<TAutoCompleteInputElement>(editor, {
    ...options,
    match: { type: getPluginType(editor, ELEMENT_AUTO_COMPLETE_INPUT) },
  });
