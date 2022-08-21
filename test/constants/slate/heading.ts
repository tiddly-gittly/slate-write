import { TEditor, Value, TElement, TText } from '@udecode/plate-core';

export const heading: Record<string, TEditor<Value> | TElement | TText | Array<TEditor<Value> | TElement | TText>> = {
  heading: [
    {
      type: 'h1',
      attributes: { class: '' },
      'tw-attributes': {
        class: {
          type: 'string',
          value: '',
        },
      },
      children: [
        {
          text: 'AAA',
        },
      ],
    },
    {
      type: 'h2',
      attributes: { class: '' },
      'tw-attributes': {
        class: {
          type: 'string',
          value: '',
        },
      },
      children: [
        {
          text: 'AAA',
        },
      ],
    },
    {
      type: 'h3',
      attributes: { class: '' },
      'tw-attributes': {
        class: {
          type: 'string',
          value: '',
        },
      },
      children: [
        {
          text: 'AAA',
        },
      ],
    },
    {
      type: 'h4',
      attributes: { class: '' },
      'tw-attributes': {
        class: {
          type: 'string',
          value: '',
        },
      },
      children: [
        {
          text: 'AAA',
        },
      ],
    },
    {
      type: 'h5',
      attributes: { class: '' },
      'tw-attributes': {
        class: {
          type: 'string',
          value: '',
        },
      },
      children: [
        {
          text: 'AAA',
        },
      ],
    },
    {
      type: 'h6',
      attributes: { class: '' },
      'tw-attributes': {
        class: {
          type: 'string',
          value: '',
        },
      },
      children: [
        {
          text: 'AAA',
        },
      ],
    },
    {
      type: 'p',
      children: [
        {
          text: 'AAA',
        },
      ],
    },
  ],
};
