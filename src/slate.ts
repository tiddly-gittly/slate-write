import type { ReactWidget } from 'tw-react';
import { EditorApp, IEditorAppProps } from './components/editor';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const Widget = require('$:/plugins/linonetwo/tw-react/widget.js').widget as typeof ReactWidget;

// TODO: implement things in https://github.com/Jermolene/TiddlyWiki5/blob/master/core/modules/editor/factory.js

class SlateWriteWidget extends Widget {
  editorOperations = {};

  constructor(parseTreeNode: any, options: any) {
    super(parseTreeNode, options);
    $tw.modules.applyMethods('texteditoroperation', this.editorOperations);
  }

  reactComponent = EditorApp;
  getProps = (): IEditorAppProps => {
    const currentTiddler = this.getAttribute('tiddler', this.getVariable('currentTiddler'));

    const onSave = (newText: string): void => {
      const previousText = $tw.wiki.getTiddlerText(currentTiddler) ?? '';
      // prevent useless call to addTiddler
      if (previousText === newText) {
        return;
      }
      $tw.wiki.setText(currentTiddler, undefined, undefined, newText);
    };
    return {
      initialText: $tw.wiki.getTiddlerText(currentTiddler) ?? '',
      saver: {
        onSave,
        interval: 1000,
      },
    };
  };
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
exports.slateWrite = SlateWriteWidget;
// fix `Undefined widget 'edit-slateWrite'`
exports['edit-slateWrite'] = SlateWriteWidget;
