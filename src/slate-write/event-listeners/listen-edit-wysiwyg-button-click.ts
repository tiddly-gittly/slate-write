/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IWidgetEvent } from 'tiddlywiki';

const isUnmodifiedShadow = (title: string) => {
  return $tw.wiki.isShadowTiddler(title) && !$tw.wiki.tiddlerExists(title);
};

declare let exports: {
  after: string[];
  name: string;
  platforms: string[];
  startup: () => void;
};
exports.name = 'th-editing-wysiwyg-tiddler-listener';
exports.platforms = ['browser'];
exports.after = ['render'];
exports.startup = () => {
  $tw.rootWidget.addEventListener('tm-edit-wysiwyg-tiddler', handleEditWYSIWYGTiddlerEvent);
};

function handleEditWYSIWYGTiddlerEvent(event?: IWidgetEvent): void {
  const editTiddler = $tw.hooks.invokeHook('th-editing-wysiwyg-tiddler', event as IWidgetEvent);
  if (editTiddler === undefined) {
    return;
  }
  const confirmEditShadow = (title: string) => {
    const win = event?.event && 'view' in event.event && event.event.view !== undefined ? event.event.view : window;
    return win?.confirm($tw.language.getString('ConfirmEditShadowTiddler', { variables: { title } }));
  };
  const title = event?.param ?? event?.tiddlerTitle;
  if (!title || (isUnmodifiedShadow(title) && !confirmEditShadow(title))) {
    return;
  }
  // switch view template to wysiwyg edit mode
  if (event?.paramObject === undefined || event.paramObject.suppressNavigation !== 'yes') {
    const tiddler = $tw.wiki.getTiddler(title);
    $tw.wiki.addTiddler({ ...tiddler?.fields, wysiwyg: tiddler?.fields?.wysiwyg === 'yes' ? undefined : 'yes' });
  }
}
