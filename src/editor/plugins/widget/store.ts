import create from 'zustand';

export interface IWidgetCodeBlockState {
  previousActiveId?: string;
  previousCodeMirrorSelection?: CodeMirror.Position;
}
export const useWidgetCodeBlockStore = create<IWidgetCodeBlockState>((_set) => ({
  previousActiveId: undefined,
  previousCodeMirrorSelection: undefined,
}));
