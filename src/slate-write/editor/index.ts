/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'requestidlecallback-polyfill';
import { IChangedTiddlers, Widget as TWWidget } from 'tiddlywiki';

import { SAVE_DEBOUNCE_INTERVAL } from './config/config';
import { App, IEditorAppProps } from './editor';

import { widget as Widget } from '$:/plugins/linonetwo/tw-react/widget.js';

// TODO: implement things in https://github.com/Jermolene/TiddlyWiki5/blob/master/core/modules/editor/factory.js

const DEFAULT_MIN_TEXT_AREA_HEIGHT = '100px'; // Minimum height of textareas in pixels

// Configuration tiddlers
const HEIGHT_MODE_TITLE = '$:/config/TextEditor/EditorHeight/Mode';
const ENABLE_TOOLBAR_TITLE = '$:/config/TextEditor/EnableToolbar';

class SlateWriteWidget extends Widget<IEditorAppProps> {
  private readonly currentTiddler: string | undefined;
  editorOperations = {};
  private editTitle: string | undefined;
  private editField: string | undefined;
  private editIndex: string | undefined;
  private editDefault: string | undefined;
  private editClass: string | undefined;
  private editPlaceholder: string | undefined;
  private editSize: string | undefined;
  private editRows: string | undefined;
  private editAutoHeight: boolean | undefined;
  private editMinHeight: string | undefined;
  private editFocusPopup: string | undefined;
  private editFocus: string | undefined;
  private editTabIndex: string | undefined;
  private editCancelPopups: boolean | undefined;
  private editInputActions: string | undefined;
  private editRefreshTitle: string | undefined;
  private editAutoComplete: string | undefined;
  private isDisabled: string | undefined;
  private isFileDropEnabled: boolean | undefined;
  private editShowToolbar: boolean | undefined;

  constructor(parseTreeNode: any, options: any) {
    super(parseTreeNode, options);
    $tw.modules.applyMethods('texteditoroperation', this.editorOperations);
  }

  reactComponent = App;
  getProps = () => {
    const onSave = (newText: string): void => {
      if (!this.editTitle) {
        return;
      }
      const previousText = $tw.wiki.getTiddlerText(this.editTitle) ?? '';
      // prevent useless call to addTiddler
      if (previousText === newText) {
        return;
      }
      $tw.wiki.setText(this.editTitle, undefined, undefined, newText);
      notifyNavigatorSaveTiddler(this.editTitle, this.parentWidget);
      this.unlock();
    };
    return {
      currentTiddler: this.editTitle ?? this.getVariable('currentTiddler'),
      initialTiddlerText: (this.editTitle && $tw.wiki.getTiddlerText(this.editTitle)) ?? '',
      saver: {
        lock: this.lock,
        onSave,
        interval: SAVE_DEBOUNCE_INTERVAL,
      },
    };
  };

  /** a lock to prevent update from tiddler to slate, when update of tiddler is trigger by slate. */
  private isUpdatingByUserInput = false;
  private updatingLockTimeoutHandle: NodeJS.Timeout | undefined;
  get editIconElement() {
    const element = (this.parentDomNode as HTMLDivElement).closest('.tc-tiddler-exists')?.querySelector('.tc-image-wysiwyg-edit-button');
    return element;
  }

  lock = () => {
    this.isUpdatingByUserInput = true;
    const iconText = this.editIconElement?.querySelector('text');
    if (iconText) {
      iconText.innerHTML = '.....';
    }
    if (this.updatingLockTimeoutHandle !== undefined) {
      clearTimeout(this.updatingLockTimeoutHandle);
    }
  };

  unlock = () => {
    this.updatingLockTimeoutHandle = setTimeout(() => {
      this.isUpdatingByUserInput = false;
      const iconText = this.editIconElement?.querySelector('text');
      if (iconText) {
        iconText.innerHTML = 'T';
      }
    });
  };

  execute() {
    // Get our parameters
    this.editTitle = this.getAttribute('tiddler', this.getVariable('currentTiddler'));
    this.editField = this.getAttribute('field', 'text');
    this.editIndex = this.getAttribute('index');
    this.editDefault = this.getAttribute('default');
    this.editClass = this.getAttribute('class');
    this.editPlaceholder = this.getAttribute('placeholder');
    this.editSize = this.getAttribute('size');
    this.editRows = this.getAttribute('rows');
    const editAutoHeight = $tw.wiki.getTiddlerText(HEIGHT_MODE_TITLE, 'auto');
    this.editAutoHeight = this.getAttribute('autoHeight', editAutoHeight === 'auto' ? 'yes' : 'no') === 'yes';
    this.editMinHeight = this.getAttribute('minHeight', DEFAULT_MIN_TEXT_AREA_HEIGHT);
    this.editFocusPopup = this.getAttribute('focusPopup');
    this.editFocus = this.getAttribute('focus');
    this.editTabIndex = this.getAttribute('tabindex');
    this.editCancelPopups = this.getAttribute('cancelPopups', '') === 'yes';
    this.editInputActions = this.getAttribute('inputActions');
    this.editRefreshTitle = this.getAttribute('refreshTitle');
    this.editAutoComplete = this.getAttribute('autocomplete');
    this.isDisabled = this.getAttribute('disabled', 'no');
    this.isFileDropEnabled = this.getAttribute('fileDrop', 'no') === 'yes';
    // Get the default editor element tag and type (textarea or div) (not implemented)

    // Make the child widgets
    this.makeChildWidgets();
    // Determine whether to show the toolbar
    const editShowToolbar = $tw.wiki.getTiddlerText(ENABLE_TOOLBAR_TITLE, 'yes');
    this.editShowToolbar = editShowToolbar === 'yes' && !!(this.children && this.children.length > 0) /* && !this.document.isTiddlyWikiFakeDom */;
  }

  refresh(changedTiddlers: IChangedTiddlers): boolean {
    // copied from `core/modules/editor/factory.js`'s `refresh`
    const changedAttributes = this.computeAttributes();
    // if tiddler change is triggered by slate, then skip the update of slate
    if (this.isUpdatingByUserInput) {
      return false;
    }
    // Completely rerender if any of our attributes have changed
    if (
      changedAttributes.tiddler ||
      changedAttributes.field ||
      changedAttributes.index ||
      changedAttributes.default ||
      changedAttributes.class ||
      changedAttributes.placeholder ||
      (changedAttributes.size as unknown as number) > 0 ||
      changedAttributes.autoHeight ||
      changedAttributes.minHeight ||
      changedAttributes.focusPopup ||
      changedAttributes.rows ||
      changedAttributes.tabindex ||
      changedAttributes.cancelPopups ||
      changedAttributes.inputActions ||
      changedAttributes.refreshTitle ||
      changedAttributes.autocomplete ||
      changedTiddlers[HEIGHT_MODE_TITLE] ||
      changedTiddlers[ENABLE_TOOLBAR_TITLE] ||
      changedAttributes.disabled ||
      changedAttributes.fileDrop ||
      (this.editRefreshTitle !== undefined && changedTiddlers[this.editRefreshTitle]) ||
      (this.editTitle && changedTiddlers[this.editTitle]?.modified)
    ) {
      this.refreshSelf();
      return this.refreshChildren(changedTiddlers);
    }
    return false;
  }
}

function notifyNavigatorSaveTiddler(title: string, parentWidget?: TWWidget) {
  window.requestIdleCallback(
    () => {
      parentWidget?.dispatchEvent({
        type: 'tm-save-tiddler',
        // param: param,
        paramObject: { suppressNavigation: 'yes' },
        tiddlerTitle: title,
      });
      parentWidget?.dispatchEvent({ type: 'tm-auto-save-wiki' });
    },
    { timeout: 2000 },
  );
}

declare let exports: {
  widget: typeof Widget;
};
exports.widget = SlateWriteWidget;
