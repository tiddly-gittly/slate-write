import { AutoformatRule } from '@udecode/plate-autoformat';
import { BulletedListPlugin, ListItemPlugin, NumberedListPlugin } from '@udecode/plate-list/react';
import { formatList, preFormat } from './autoformatUtils';

export const autoformatLists: AutoformatRule[] = [
  {
    mode: 'block',
    type: ListItemPlugin.key,
    match: ['* ', '- '],
    preFormat,
    format: (editor) => {
      formatList(editor, BulletedListPlugin.key);
    },
  },
  {
    mode: 'block',
    type: ListItemPlugin.key,
    match: ['1. ', '1) ', '# '],
    preFormat,
    format: (editor) => {
      formatList(editor, NumberedListPlugin.key);
    },
  },
];
