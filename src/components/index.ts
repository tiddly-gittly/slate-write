import type { ReactWidget } from 'tw-react';
import { EditorApp, IEditorAppProps } from './editor';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const Widget = require('$:/plugins/linonetwo/tw-react/widget.js').widget as typeof ReactWidget;

// TODO: implement things in https://github.com/Jermolene/TiddlyWiki5/blob/master/core/modules/editor/factory.js

class SlateWriteWidget extends Widget {
  private currentTiddler: string | undefined;

  refresh(): boolean {
    // TODO: reflect change from editor command that change tiddler outside of editor
    return false;
  }

  editorOperations = {};

  constructor(parseTreeNode: any, options: any) {
    super(parseTreeNode, options);
    $tw.modules.applyMethods('texteditoroperation', this.editorOperations);
  }

  reactComponent = EditorApp;
  getProps = (): IEditorAppProps => {
    const currentTiddler = this.getAttribute('tiddler', this.getVariable('currentTiddler'));
    this.currentTiddler = currentTiddler;

    const onSave = (newText: string): void => {
      const previousText = $tw.wiki.getTiddlerText(currentTiddler) ?? '';
      // prevent useless call to addTiddler
      if (previousText === newText) {
        return;
      }
      $tw.wiki.setText(currentTiddler, undefined, undefined, newText);
    };
    return {
      currentTiddler,
      initialText: $tw.wiki.getTiddlerText(currentTiddler) ?? '',
      saver: {
        onSave,
        interval: 1000,
      },
    };
  };
}
exports.SlateWriteWidget = SlateWriteWidget;
