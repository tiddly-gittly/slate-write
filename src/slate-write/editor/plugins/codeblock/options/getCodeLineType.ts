import { PlateEditor, getPluginType } from '@udecode/plate-core';
import { Value } from '@udecode/slate';
import { ELEMENT_CODE_LINE } from '../constants';

export const getCodeLineType = <V extends Value>(editor: PlateEditor<V>): string => getPluginType(editor, ELEMENT_CODE_LINE);
