import { AutoformatRule } from '@udecode/plate-autoformat';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_DEFAULT, getPluginType } from '@udecode/plate-core';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { ELEMENT_HR } from '@udecode/plate-horizontal-rule';
import { insertNodes, setElements } from '@udecode/slate';
import { ELEMENT_CODE_BLOCK } from 'wikiast-util-from-slate-plate-ast';
import { insertEmptyCodeBlock } from '../../plugins/codeblock/transforms/insertEmptyCodeBlock';
import { clearBlockFormat } from './autoformatUtils';

export const autoformatBlocks: AutoformatRule[] = [
  {
    mode: 'block',
    type: ELEMENT_H1,
    match: ['! ', '！ '],
    preFormat: clearBlockFormat,
  },
  {
    mode: 'block',
    type: ELEMENT_H2,
    match: ['!! ', '！！ '],
    preFormat: clearBlockFormat,
  },
  {
    mode: 'block',
    type: ELEMENT_H3,
    match: ['!!! ', '！！！ '],
    preFormat: clearBlockFormat,
  },
  {
    mode: 'block',
    type: ELEMENT_H4,
    match: ['!!!! ', '！！！！ '],
    preFormat: clearBlockFormat,
  },
  {
    mode: 'block',
    type: ELEMENT_H5,
    match: ['!!!!! ', '！！！！！ '],
    preFormat: clearBlockFormat,
  },
  {
    mode: 'block',
    type: ELEMENT_H6,
    match: ['!!!!!! ', '！！！！！！ '],
    preFormat: clearBlockFormat,
  },
  {
    mode: 'block',
    type: ELEMENT_BLOCKQUOTE,
    match: ['> ', '》 '],
    preFormat: clearBlockFormat,
  },
  {
    mode: 'block',
    type: ELEMENT_HR,
    match: ['---', '—-'],
    preFormat: clearBlockFormat,
    format: (editor) => {
      setElements(editor, { type: ELEMENT_HR });
      insertNodes(editor, {
        type: ELEMENT_DEFAULT,
        children: [{ text: '' }],
      });
    },
  },
  {
    mode: 'block',
    type: ELEMENT_CODE_BLOCK,
    match: '```',
    triggerAtBlockStart: false,
    preFormat: clearBlockFormat,
    format: (editor) => {
      insertEmptyCodeBlock(editor, {
        defaultType: getPluginType(editor, ELEMENT_DEFAULT),
        insertNodesOptions: { select: true },
      });
    },
  },
];
