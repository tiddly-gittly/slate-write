/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PlateEditor, Value } from '@udecode/slate';
import { findAutoCompleteInput } from './findAutoCompleteInput';

export const isSelectionInAutoCompleteInput = <V extends Value>(editor: PlateEditor<V>) => findAutoCompleteInput(editor) !== undefined;
