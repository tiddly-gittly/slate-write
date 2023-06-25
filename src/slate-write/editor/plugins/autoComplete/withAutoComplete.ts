/* eslint-disable unicorn/no-null */
/**
 * Copied from plate's `packages/nodes/autocomplete/src/withAutoComplete.ts` to support `[[` two char trigger
 * Tests are not copied...Until we support tsx tests
 */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  getEditorString,
  getNodeString,
  getPlugin,
  getPointAfter,
  getPointBefore,
  getRange,
  insertNodes,
  PlateEditor,
  setSelection,
  TNode,
  TText,
  Value,
  WithPlatePlugin,
} from '@udecode/plate-core';
import { Location, Range } from 'slate';
import { AutoCompletePlugin, TAutoCompleteInputElement } from './types';
import { ELEMENT_AUTO_COMPLETE_INPUT } from './createAutoCompletePlugin';
import { findAutoCompleteInput, isSelectionInAutoCompleteInput, isNodeAutoCompleteInput } from './queries';
import { removeAutoCompleteInputAtPath } from './transforms';
import { useAutoCompletePluginStore } from '../comboBox/store';

export const withAutoComplete = <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(
  editor: E,
  { options: { id, trigger, inputCreation, keepTrigger, needSpaceBeforeTrigger } }: WithPlatePlugin<AutoCompletePlugin, V, E>,
) => {
  const { type } = getPlugin<Record<string, unknown>, V>(editor, ELEMENT_AUTO_COMPLETE_INPUT);

  const { apply, insertBreak, insertText, deleteBackward } = editor;

  editor.deleteBackward = (unit) => {
    const currentAutoCompleteInput = findAutoCompleteInput(editor);
    if (currentAutoCompleteInput && getNodeString(currentAutoCompleteInput[0]) === '') {
      return removeAutoCompleteInputAtPath(editor, currentAutoCompleteInput[1]);
    }

    deleteBackward(unit);
  };

  editor.insertBreak = () => {
    if (isSelectionInAutoCompleteInput(editor)) {
      return;
    }

    insertBreak();
  };

  const textMatchTrigger = (text: string, currentTrigger: string | undefined, currentSelection: Location): currentTrigger is string => {
    if (!currentTrigger) return false;
    if (currentTrigger.length === 1 && text === currentTrigger) return true;
    if (currentTrigger.length > 1) {
      const previousChars = getEditorString(
        editor,
        getRange(editor, currentSelection, getPointBefore(editor, currentSelection, { distance: currentTrigger.length - 1 })),
      );
      if (`${previousChars}${text}` === currentTrigger) {
        return true;
      }
    }
    return false;
  };

  editor.insertText = (text) => {
    const { selection } = editor;
    if (!selection || isSelectionInAutoCompleteInput(editor)) {
      return insertText(text);
    }
    if (!textMatchTrigger(text, trigger, selection)) {
      return insertText(text);
    }

    // Make sure a autocomplete input is created at the beginning of line or after a whitespace
    const previousChar = getEditorString(editor, getRange(editor, selection, getPointBefore(editor, selection, { distance: trigger.length + 1 })));
    const previousCharPlus1 = getEditorString(editor, getRange(editor, selection, getPointBefore(editor, selection, { distance: trigger.length + 2 })));

    const nextChar = getEditorString(editor, getRange(editor, selection, getPointAfter(editor, selection)));

    const beginningOfLine = previousChar === '' || previousChar.length === previousCharPlus1.length;
    const endOfLine = nextChar === '';
    const precededByWhitespace = !needSpaceBeforeTrigger || (needSpaceBeforeTrigger && previousChar.startsWith(' '));
    const followedByWhitespace = nextChar === ' ';

    if ((beginningOfLine || precededByWhitespace) && (endOfLine || followedByWhitespace)) {
      const data: TAutoCompleteInputElement = {
        type,
        children: [{ text: '' }],
        trigger,
      };
      if (inputCreation) {
        data[inputCreation.key] = inputCreation.value;
      }
      if (keepTrigger) {
        insertText(text);
      } else if (trigger.length > 1) {
        deleteBackward('character');
      }
      return insertNodes<TAutoCompleteInputElement>(editor, data);
    }

    return insertText(text);
  };

  editor.apply = (operation) => {
    apply(operation);
    const { selection } = editor;
    if (operation.type === 'insert_text' || operation.type === 'remove_text') {
      const currentAutoCompleteInput = findAutoCompleteInput(editor);
      if (currentAutoCompleteInput) {
        useAutoCompletePluginStore.setState({ text: getNodeString(currentAutoCompleteInput[0]) });
      }
    } else if (operation.type === 'set_selection') {
      const previousAutoCompleteInputPath = Range.isRange(operation.properties) ? findAutoCompleteInput(editor, { at: operation.properties })?.[1] : undefined;

      const currentAutoCompleteInputPath = Range.isRange(operation.newProperties)
        ? findAutoCompleteInput(editor, { at: operation.newProperties })?.[1]
        : undefined;

      if (previousAutoCompleteInputPath && !currentAutoCompleteInputPath) {
        removeAutoCompleteInputAtPath(editor, previousAutoCompleteInputPath);
      }

      if (currentAutoCompleteInputPath) {
        useAutoCompletePluginStore.setState({ targetRange: selection as Range });
      }
    } else if (operation.type === 'insert_node' && isNodeAutoCompleteInput(editor, operation.node as TNode)) {
      if ((operation.node as TAutoCompleteInputElement).trigger !== trigger) {
        return;
      }

      const text = ((operation.node as TAutoCompleteInputElement).children as TText[])[0]?.text ?? '';

      if (inputCreation === undefined || operation.node[inputCreation.key] === inputCreation.value) {
        // Needed for undo - after an undo a autocomplete insert we only receive
        // an insert_node with the autocomplete input, i.e. nothing indicating that it
        // was an undo.
        setSelection(editor, {
          anchor: { path: [...operation.path, 0], offset: text.length },
          focus: { path: [...operation.path, 0], offset: text.length },
        });

        useAutoCompletePluginStore.setState({
          activeId: id!,
          text,
          targetRange: selection,
        });
      }
    } else if (operation.type === 'remove_node' && isNodeAutoCompleteInput(editor, operation.node as TNode)) {
      if ((operation.node as TAutoCompleteInputElement).trigger !== trigger) {
        return;
      }

      useAutoCompletePluginStore.getState().reset();
    }
  };

  return editor;
};
