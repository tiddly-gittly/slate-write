import { createStore } from '@udecode/plate-core';

export interface IWidgetCodeBlockState {
  previousActiveId?: string;
  previousCodeMirrorSelection?: CodeMirror.Position;
}
export const useWidgetCodeBlockStore = createStore('use-widget')<IWidgetCodeBlockState>({
  previousActiveId: undefined,
  previousCodeMirrorSelection: undefined,
});
