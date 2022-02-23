import type { ReactWidget } from 'tw-react';
import { EditorApp, IEditorAppProps } from './components/editor';

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

    const onSave = (newText: string) => {
      const prevText = $tw.wiki.getTiddlerText(currentTiddler) ?? '';
      // prevent useless call to addTiddler
      if (prevText === newText) {
        return;
      }
      $tw.wiki.setText(currentTiddler, undefined, undefined, newText);
    };
    return {
      saver: {
        onSave,
      },
    };
  };
}

exports.slateWrite = SlateWriteWidget;
