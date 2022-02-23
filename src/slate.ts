import React, { useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { ITiddlerFields } from 'tiddlywiki';
import type { ReactWidget } from 'tw-react';

const Widget = require('$:/plugins/linonetwo/tw-react/widget.js').widget as typeof ReactWidget;
