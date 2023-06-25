import type { Data, NoData } from '@udecode/plate-combobox';
import { TElement } from '@udecode/slate';
import { CreateAutoCompleteNode } from '../comboBox/getAutoCompleteOnSelectItem';

export interface TAutoCompleteElement extends TElement {
  value: string;
}

export interface TAutoCompleteInputElement extends TElement {
  trigger: string;
}

export interface AutoCompletePlugin<TData extends Data = NoData> {
  createAutoCompleteNode?: CreateAutoCompleteNode<TData>;
  id?: string;
  inputCreation?: { key: string; value: string };
  keepTrigger?: boolean;
  needSpaceBeforeTrigger?: boolean;
  textToInsertAfter?: string;
  trigger?: string;
}
