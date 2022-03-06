import { Editor, Transforms, Range, Point, Element as SlateElement } from 'slate';
import type { CustomEditor, ElementElement } from './editor';

const SHORTCUTS = {
  '*': 'list-item',
  '#': 'list-item',
  '>': 'block-quote',
  '》': 'block-quote',
  '!': 'heading-one',
  '!!': 'heading-two',
  '!!!': 'heading-three',
  '!!!!': 'heading-four',
  '!!!!!': 'heading-five',
  '!!!!!!': 'heading-six',
  '！': 'heading-one',
  '！！': 'heading-two',
  '！！！': 'heading-three',
  '！！！！': 'heading-four',
  '！！！！！': 'heading-five',
  '！！！！！！': 'heading-six',
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
      const beforeText = Editor.string(editor, range);

      if (beforeText in SHORTCUTS) {
        const type = SHORTCUTS[beforeText as keyof typeof SHORTCUTS];
        Transforms.select(editor, range);
        Transforms.delete(editor);
        const newProperties: Partial<SlateElement> = {
          type,
        };
        Transforms.setNodes<SlateElement>(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (type === SHORTCUTS['*']) {
          const list: ElementElement = {
            type: 'element',
            tag: 'li',
            children: [],
          };
          Transforms.wrapNodes(editor, list, {
            match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'list-item',
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

        if (!Editor.isEditor(block) && SlateElement.isElement(block) && block.type !== 'paragraph' && Point.equals(selection.anchor, start)) {
          const newProperties: Partial<SlateElement> = {
            type: 'paragraph',
          };
          Transforms.setNodes(editor, newProperties);

          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'bulleted-list',
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
