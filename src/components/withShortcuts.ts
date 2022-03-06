import type { KeyboardEvent } from 'react';
import { Editor, Transforms, Range, Point, Element as SlateElement } from 'slate';
import type { CustomEditor, ElementElement } from './editor';

const SHORTCUTS = {
  '*': 'li',
  '#': 'li',
  '>': 'blockquote',
  '》': 'blockquote',
  '<<<': 'blockquote',
  '《《《': 'blockquote',
  '!': 'h1',
  '!!': 'h2',
  '!!!': 'h3',
  '!!!!': 'h4',
  '!!!!!': 'h5',
  '!!!!!!': 'h6',
  '！': 'h1',
  '！！': 'h2',
  '！！！': 'h3',
  '！！！！': 'h4',
  '！！！！！': 'h5',
  '！！！！！！': 'h6',
};

export const withShortcuts = (editor: CustomEditor): CustomEditor => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    if (text === ' ' && selection !== null && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block !== undefined ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const triggerText = Editor.string(editor, range);

      if (triggerText in SHORTCUTS) {
        const tag = SHORTCUTS[triggerText as keyof typeof SHORTCUTS];
        Transforms.select(editor, range);
        Transforms.delete(editor);
        const newProperties: Partial<SlateElement> = {
          type: 'element',
          tag,
        };
        Transforms.setNodes<SlateElement>(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (triggerText === '*' || triggerText === '#') {
          const list: ElementElement = {
            type: 'element',
            tag: triggerText === '*' ? 'ul' : 'ol',
            children: [],
          };
          Transforms.wrapNodes(editor, list, {
            match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'element' && (n as ElementElement).tag === 'li',
          });
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...arguments_) => {
    const { selection } = editor;

    if (selection !== null && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match !== undefined) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        /** delete `ul` `ol`, change them to a `p` when pressing backspace */
        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type === 'element' &&
          (block as ElementElement).tag !== 'p' &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<SlateElement> = {
            type: 'element',
            tag: 'p',
          };
          Transforms.setNodes(editor, newProperties);

          if (block.type === 'element' && (block as ElementElement).tag === 'li') {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === 'element' &&
                ((n as ElementElement).tag === 'ul' || (n as ElementElement).tag === 'ol'),
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...arguments_);
    }
  };

  return editor;
};

export const withShortcutsOnKeyDown = (editor: CustomEditor, event: KeyboardEvent<HTMLDivElement>): void => {
  const { selection } = editor;
  // handle enter key on empty list item, turn node to `p`
  switch (event.key) {
    case 'Enter': {
      if (selection !== null && Range.isCollapsed(selection)) {
        const match = Editor.above(editor, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (match !== undefined) {
          const [block, path] = match;
          const start = Editor.start(editor, path);

          /** delete `ul` `ol`, change them to a `p` when pressing backspace */
          if (
            !Editor.isEditor(block) &&
            SlateElement.isElement(block) &&
            block.type === 'element' &&
            (block as ElementElement).tag !== 'p' &&
            Point.equals(selection.anchor, start)
          ) {
            // pressing enter is same as pressing backspace
            editor.deleteBackward('block');
            // prevent adding a new line
            event.preventDefault();
          }
        }
      }
      break;
    }
    case 'Tab': {
      if (selection !== null && Range.isCollapsed(selection)) {
        const match = Editor.above(editor, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (match !== undefined) {
          const [block, path] = match;
          const start = Editor.start(editor, path);

          /** wrap list item with list to make it a level up */
          if (
            !Editor.isEditor(block) &&
            SlateElement.isElement(block) &&
            block.type === 'element' &&
            (block as ElementElement).tag === 'li' &&
            Point.equals(selection.anchor, start)
          ) {
            const newNodeWrapper: ElementElement = {
              type: 'element',
              tag: 'ol',
              children: [],
            };
            Transforms.wrapNodes(editor, newNodeWrapper);
            // prevent switching to next focus
            event.preventDefault();
          }
        }
      }
      break;
    }
  }
};
