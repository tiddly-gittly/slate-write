import { IWidgetEvent, Widget } from 'tiddlywiki';

const NavigatorWidget = require('$:/core/modules/widgets/navigator.js').navigator;

NavigatorWidget.prototype.handleEditWYSIWYGTiddlerEvent = function (event: IWidgetEvent) {
  const editTiddler = $tw.hooks.invokeHook('th-editing-wysiwyg-tiddler', event);
  if (!editTiddler) {
    return false;
  }
  const isUnmodifiedShadow = (title: string) => {
    return this.wiki.isShadowTiddler(title) && !this.wiki.tiddlerExists(title);
  };
  const confirmEditShadow = (title: string) => {
    const win = event.event && 'view' in event.event && event.event.view ? event.event.view : window;
    return win.confirm($tw.language.getString('ConfirmEditShadowTiddler', { variables: { title: title } }));
  };
  const title = event.param || event.tiddlerTitle;
  if (!title || (isUnmodifiedShadow(title) && !confirmEditShadow(title))) {
    return false;
  }
  // switch view template to wysiwyg edit mode
  if (!event.paramObject || event.paramObject.suppressNavigation !== 'yes') {
    const tiddler = $tw.wiki.getTiddler(title);
    $tw.wiki.addTiddler({ ...tiddler?.fields, wysiwyg: tiddler?.fields?.wysiwyg === 'yes' ? undefined : 'yes' });
    return false;
  }
};

const coreRender = NavigatorWidget.prototype.render as Widget['render'];
NavigatorWidget.prototype.render = function (parent: Node, nextSibling: Node) {
  this.addEventListeners([{ type: 'tm-edit-wysiwyg-tiddler', handler: 'handleEditWYSIWYGTiddlerEvent' }]);
  coreRender.apply(this, [parent, nextSibling]);
};