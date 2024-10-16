import { AutoformatRule } from '@udecode/plate-autoformat';
import { BoldPlugin, CodePlugin, ItalicPlugin, StrikethroughPlugin, SubscriptPlugin, SuperscriptPlugin, UnderlinePlugin } from '@udecode/plate-basic-marks/react';

export const autoformatMarks: AutoformatRule[] = [
  // {
  //   mode: 'mark',
  //   type: [BoldPlugin.key, ItalicPlugin.key],
  //   match: '***',
  // },
  // {
  //   mode: 'mark',
  //   type: [UnderlinePlugin.key, ItalicPlugin.key],
  //   match: '__*',
  // },
  // {
  //   mode: 'mark',
  //   type: [UnderlinePlugin.key, BoldPlugin.key],
  //   match: '__**',
  // },
  // {
  //   mode: 'mark',
  //   type: [UnderlinePlugin.key, BoldPlugin.key, ItalicPlugin.key],
  //   match: '___***',
  // },
  {
    mode: 'mark',
    type: BoldPlugin.key,
    match: ["''"],
  },
  {
    mode: 'mark',
    type: UnderlinePlugin.key,
    match: '__',
  },
  {
    mode: 'mark',
    type: ItalicPlugin.key,
    match: ['//'],
  },
  {
    mode: 'mark',
    type: StrikethroughPlugin.key,
    match: '~~',
  },
  {
    mode: 'mark',
    type: SuperscriptPlugin.key,
    match: '^^',
  },
  {
    mode: 'mark',
    type: SubscriptPlugin.key,
    match: [',,', '，，'],
  },
  {
    mode: 'mark',
    type: CodePlugin.key,
    match: '`',
  },
];
