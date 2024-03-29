import { getPluginType, PlateEditor } from '@udecode/plate-core';
import { TNode, Value } from '@udecode/slate';
import { ELEMENT_AUTO_COMPLETE_INPUT } from '../createAutoCompletePlugin';
import { TAutoCompleteInputElement } from '../types';

export const isNodeAutoCompleteInput = <V extends Value>(editor: PlateEditor<V>, node: TNode): node is TAutoCompleteInputElement => {
  return node.type === getPluginType(editor, ELEMENT_AUTO_COMPLETE_INPUT);
};
