import { AutoformatRule } from '@udecode/plate-autoformat';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { insertEmptyCodeBlock } from '@udecode/plate-code-block';
import { ParagraphPlugin } from '@udecode/plate-core/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { insertNodes, setNodes } from '@udecode/slate';
import { ELEMENT_CODE_BLOCK } from 'wikiast-util-from-slate-plate-ast';
import { preFormat } from './autoformatUtils';

export const autoformatBlocks: AutoformatRule[] = [
  {
    mode: 'block',
    type: HEADING_KEYS.h1,
    match: ['! ', '！ '],
    preFormat,
  },
  {
    mode: 'block',
    type: HEADING_KEYS.h2,
    match: ['!! ', '！！ '],
    preFormat,
  },
  {
    mode: 'block',
    type: HEADING_KEYS.h3,
    match: ['!!! ', '！！！ '],
    preFormat,
  },
  {
    mode: 'block',
    type: HEADING_KEYS.h4,
    match: ['!!!! ', '！！！！ '],
    preFormat,
  },
  {
    mode: 'block',
    type: HEADING_KEYS.h5,
    match: ['!!!!! ', '！！！！！ '],
    preFormat,
  },
  {
    mode: 'block',
    type: HEADING_KEYS.h6,
    match: ['!!!!!! ', '！！！！！！ '],
    preFormat,
  },
  {
    mode: 'block',
    type: BlockquotePlugin.key,
    match: ['> ', '》 '],
    preFormat,
  },
  {
    mode: 'block',
    type: HorizontalRulePlugin.key,
    match: ['---', '—-'],
    preFormat,
    format: (editor) => {
      setNodes(editor, { type: HorizontalRulePlugin.key });
      insertNodes(editor, {
        children: [{ text: '' }],
        type: ParagraphPlugin.key,
      });
    },
  },
  {
    mode: 'block',
    type: ELEMENT_CODE_BLOCK,
    match: '```',
    triggerAtBlockStart: false,
    preFormat,
    format: (editor) => {
      insertEmptyCodeBlock(editor, {
        defaultType: ParagraphPlugin.key,
        insertNodesOptions: { select: true },
      });
    },
  },
];
