/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { IParseTreeNode } from 'tiddlywiki';

export const table: Record<string, IParseTreeNode[] | IParseTreeNode> = {
  table: [
    {
      type: 'element',
      tag: 'table',
      children: [
        {
          type: 'element',
          tag: 'tbody',
          children: [
            {
              type: 'element',
              tag: 'tr',
              children: [
                { type: 'element', tag: 'td', children: [{ type: 'text', text: 'cell one', start: 1, end: 9 }] },
                { type: 'element', tag: 'td', children: [{ type: 'text', text: 'cell two', start: 10, end: 18 }] },
              ],
              attributes: { class: { name: 'class', type: 'string', value: 'evenRow' } },
              orderedAttributes: [
                {
                  name: 'class',
                  type: 'string',
                  value: 'evenRow',
                },
              ],
            },
            {
              type: 'element',
              tag: 'tr',
              children: [
                { type: 'element', tag: 'td', children: [{ type: 'text', text: 'cell three', start: 21, end: 31 }] },
                { type: 'element', tag: 'td', children: [{ type: 'text', text: 'cell four', start: 32, end: 41 }] },
              ],
              attributes: { class: { name: 'class', type: 'string', value: 'oddRow' } },
              orderedAttributes: [
                {
                  name: 'class',
                  type: 'string',
                  value: 'oddRow',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  tableGettingStarted: [
    {
      type: 'set',
      attributes: { name: { type: 'string', value: 'lingo-base' }, value: { type: 'string', value: '$:/language/ControlPanel/Basics/' } },
      children: [
        {
          type: 'element',
          tag: 'p',
          children: [{ type: 'text', text: '欢迎使用 ~TiddlyWiki 及参与 ~TiddlyWiki 社群', start: 54, end: 89 }],
          start: 54,
          end: 89,
        },
        {
          type: 'element',
          tag: 'p',
          children: [
            { type: 'text', text: '开始将重要资讯存放于 ~TiddlyWiki 之前，确认您可以可靠地保存变更是很重要的。详细资讯请参阅 ', start: 91, end: 143 },
            {
              type: 'element',
              tag: 'a',
              attributes: {
                href: { type: 'string', value: 'https://tiddlywiki.com/#GettingStarted' },
                class: { type: 'string', value: 'tc-tiddlylink-external' },
                target: { type: 'string', value: '_blank' },
                rel: { type: 'string', value: 'noopener noreferrer' },
              },
              children: [{ type: 'text', text: 'https://tiddlywiki.com/#GettingStarted' }],
            },
          ],
          start: 91,
          end: 181,
        },
        {
          type: 'element',
          tag: 'h2',
          attributes: { class: { type: 'string', value: '' } },
          children: [{ type: 'text', text: '设置此 ~TiddlyWiki', start: 186, end: 201 }],
        },
        {
          type: 'element',
          start: 203,
          attributes: { class: { start: 207, name: 'class', type: 'string', value: 'tc-control-panel', end: 232 } },
          orderedAttributes: [{ start: 207, name: 'class', type: 'string', value: 'tc-control-panel', end: 232 }],
          tag: 'div',
          end: 233,
          isBlock: true,
          children: [
            {
              type: 'element',
              tag: 'table',
              children: [
                {
                  type: 'element',
                  tag: 'tbody',
                  children: [
                    {
                      type: 'element',
                      tag: 'tr',
                      children: [
                        {
                          type: 'element',
                          tag: 'td',
                          children: [
                            {
                              type: 'link',
                              start: 236,
                              attributes: { to: { start: 242, name: 'to', type: 'string', value: '$:/SiteTitle', end: 260 } },
                              orderedAttributes: [{ start: 242, name: 'to', type: 'string', value: '$:/SiteTitle', end: 260 }],
                              tag: '$link',
                              end: 261,
                              isBlock: false,
                              children: [
                                {
                                  type: 'macrocall',
                                  start: 261,
                                  params: [{ type: 'macro-parameter', start: 268, value: 'Title/Prompt', end: 281 }],
                                  name: 'lingo',
                                  end: 283,
                                },
                              ],
                            },
                          ],
                          attributes: { align: { type: 'string', value: 'left' } },
                        },
                        {
                          type: 'element',
                          tag: 'td',
                          children: [
                            {
                              type: 'edit-text',
                              start: 293,
                              attributes: {
                                tiddler: { start: 304, name: 'tiddler', type: 'string', value: '$:/SiteTitle', end: 327 },
                                default: { start: 327, name: 'default', type: 'string', value: '', end: 338 },
                                tag: { start: 338, name: 'tag', type: 'string', value: 'input', end: 350 },
                              },
                              orderedAttributes: [
                                { start: 304, name: 'tiddler', type: 'string', value: '$:/SiteTitle', end: 327 },
                                { start: 327, name: 'default', type: 'string', value: '', end: 338 },
                                { start: 338, name: 'tag', type: 'string', value: 'input', end: 350 },
                              ],
                              tag: '$edit-text',
                              isSelfClosing: true,
                              end: 352,
                              isBlock: false,
                            },
                          ],
                          attributes: { align: { type: 'string', value: 'left' } },
                        },
                      ],
                      attributes: { class: { type: 'string', value: 'evenRow' } },
                    },
                    {
                      type: 'element',
                      tag: 'tr',
                      children: [
                        {
                          type: 'element',
                          tag: 'td',
                          children: [
                            {
                              type: 'link',
                              start: 356,
                              attributes: { to: { start: 362, name: 'to', type: 'string', value: '$:/SiteSubtitle', end: 383 } },
                              orderedAttributes: [{ start: 362, name: 'to', type: 'string', value: '$:/SiteSubtitle', end: 383 }],
                              tag: '$link',
                              end: 384,
                              isBlock: false,
                              children: [
                                {
                                  type: 'macrocall',
                                  start: 384,
                                  params: [{ type: 'macro-parameter', start: 391, value: 'Subtitle/Prompt', end: 407 }],
                                  name: 'lingo',
                                  end: 409,
                                },
                              ],
                            },
                          ],
                          attributes: { align: { type: 'string', value: 'left' } },
                        },
                        {
                          type: 'element',
                          tag: 'td',
                          children: [
                            {
                              type: 'edit-text',
                              start: 419,
                              attributes: {
                                tiddler: { start: 430, name: 'tiddler', type: 'string', value: '$:/SiteSubtitle', end: 456 },
                                default: { start: 456, name: 'default', type: 'string', value: '', end: 467 },
                                tag: { start: 467, name: 'tag', type: 'string', value: 'input', end: 479 },
                              },
                              orderedAttributes: [
                                { start: 430, name: 'tiddler', type: 'string', value: '$:/SiteSubtitle', end: 456 },
                                { start: 456, name: 'default', type: 'string', value: '', end: 467 },
                                { start: 467, name: 'tag', type: 'string', value: 'input', end: 479 },
                              ],
                              tag: '$edit-text',
                              isSelfClosing: true,
                              end: 481,
                              isBlock: false,
                            },
                          ],
                          attributes: { align: { type: 'string', value: 'left' } },
                        },
                      ],
                      attributes: { class: { type: 'string', value: 'oddRow' } },
                    },
                    {
                      type: 'element',
                      tag: 'tr',
                      children: [
                        {
                          type: 'element',
                          tag: 'td',
                          children: [
                            {
                              type: 'link',
                              start: 485,
                              attributes: { to: { start: 491, name: 'to', type: 'string', value: '$:/DefaultTiddlers', end: 515 } },
                              orderedAttributes: [{ start: 491, name: 'to', type: 'string', value: '$:/DefaultTiddlers', end: 515 }],
                              tag: '$link',
                              end: 516,
                              isBlock: false,
                              children: [
                                {
                                  type: 'macrocall',
                                  start: 516,
                                  params: [{ type: 'macro-parameter', start: 523, value: 'DefaultTiddlers/Prompt', end: 546 }],
                                  name: 'lingo',
                                  end: 548,
                                },
                              ],
                            },
                          ],
                          attributes: { align: { type: 'string', value: 'left' } },
                        },
                        {
                          type: 'element',
                          tag: 'td',
                          children: [
                            {
                              type: 'macrocall',
                              start: 558,
                              params: [{ type: 'macro-parameter', start: 565, value: 'DefaultTiddlers/TopHint', end: 589 }],
                              name: 'lingo',
                              end: 591,
                            },
                            { type: 'element', start: 591, attributes: {}, orderedAttributes: [], tag: 'br', end: 595, isBlock: false },
                            { type: 'text', text: ' ', start: 595, end: 596 },
                            {
                              type: 'edit',
                              start: 596,
                              attributes: {
                                tag: { start: 602, name: 'tag', type: 'string', value: 'textarea', end: 617 },
                                tiddler: { start: 617, name: 'tiddler', type: 'string', value: '$:/DefaultTiddlers', end: 646 },
                              },
                              orderedAttributes: [
                                { start: 602, name: 'tag', type: 'string', value: 'textarea', end: 617 },
                                { start: 617, name: 'tiddler', type: 'string', value: '$:/DefaultTiddlers', end: 646 },
                              ],
                              tag: '$edit',
                              isSelfClosing: true,
                              end: 648,
                              isBlock: false,
                            },
                            { type: 'element', start: 648, attributes: {}, orderedAttributes: [], tag: 'br', end: 652, isBlock: false },
                            {
                              type: 'element',
                              tag: 'em',
                              children: [
                                {
                                  type: 'macrocall',
                                  start: 654,
                                  params: [{ type: 'macro-parameter', start: 661, value: 'DefaultTiddlers/BottomHint', end: 688 }],
                                  name: 'lingo',
                                  end: 690,
                                },
                              ],
                            },
                          ],
                          attributes: { align: { type: 'string', value: 'left' } },
                        },
                      ],
                      attributes: { class: { type: 'string', value: 'evenRow' } },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'element',
          tag: 'p',
          children: [
            { type: 'text', text: '请参阅', start: 703, end: 706 },
            { type: 'link', attributes: { to: { type: 'string', value: '$:/ControlPanel' } }, children: [{ type: 'text', text: '控制台' }] },
            { type: 'text', text: '查看更多选项。', start: 729, end: 736 },
          ],
          start: 703,
          end: 736,
        },
      ],
      params: [],
      isMacroDefinition: true,
    },
  ],
};
