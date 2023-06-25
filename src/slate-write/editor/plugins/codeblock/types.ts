import { HotkeyPlugin, InsertNodesOptions, TElement, Value } from '@udecode/slate';

export interface CodeBlockPlugin extends HotkeyPlugin {
  deserializers?: string[];
  showSyntaxSwitcher?: boolean;
  syntaxPopularFirst?: boolean;
}

export interface TCodeBlockElement extends TElement {
  code: string;
  language?: string;
}

export interface CodeBlockInsertOptions<V extends Value> {
  defaultType?: string;
  insertNodesOptions?: Omit<InsertNodesOptions<V>, 'match'>;
  level?: number;
}
