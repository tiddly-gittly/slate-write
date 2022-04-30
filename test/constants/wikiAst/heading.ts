/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { IParseTreeNode } from 'tiddlywiki';

export const heading: Record<string, IParseTreeNode[] | IParseTreeNode> = {
  heading: [
    {
      type: 'element',
      tag: 'h1',
      attributes: {
        class: {
          type: 'string',
          value: '',
        },
      },
      children: [
        {
          type: 'text',
          text: 'AAA',
          start: 2,
          end: 5,
        },
      ],
    },
    {
      type: 'element',
      tag: 'h2',
      attributes: {
        class: {
          type: 'string',
          value: '',
        },
      },
      children: [
        {
          type: 'text',
          text: 'AAA',
          start: 10,
          end: 13,
        },
      ],
    },
    {
      type: 'element',
      tag: 'h3',
      attributes: {
        class: {
          type: 'string',
          value: '',
        },
      },
      children: [
        {
          type: 'text',
          text: 'AAA',
          start: 19,
          end: 22,
        },
      ],
    },
    {
      type: 'element',
      tag: 'h4',
      attributes: {
        class: {
          type: 'string',
          value: '',
        },
      },
      children: [
        {
          type: 'text',
          text: 'AAA',
          start: 29,
          end: 32,
        },
      ],
    },
    {
      type: 'element',
      tag: 'h5',
      attributes: {
        class: {
          type: 'string',
          value: '',
        },
      },
      children: [
        {
          type: 'text',
          text: 'AAA',
          start: 40,
          end: 43,
        },
      ],
    },
    {
      type: 'element',
      tag: 'h6',
      attributes: {
        class: {
          type: 'string',
          value: '',
        },
      },
      children: [
        {
          type: 'text',
          text: 'AAA',
          start: 52,
          end: 55,
        },
      ],
    },
    {
      type: 'element',
      tag: 'p',
      children: [
        {
          type: 'text',
          text: 'AAA',
          start: 57,
          end: 60,
        },
      ],
      start: 57,
      end: 60,
    },
  ],
};
