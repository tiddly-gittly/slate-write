/** copied from plate's packages/nodes/heading/src/createHeadingPlugin.ts , modify the hotkey and limit of level */
/* eslint-disable unicorn/no-thenable */
import { createPluginFactory, onKeyDownToggleElement, PlatePlugin } from '@udecode/plate-core';
import { HeadingPlugin, HeadingsPlugin, KEYS_HEADING } from '@udecode/plate-heading';

/**
 * Enables support for headings with configurable levels
 * (from 1 to 6).
 */
export const createHeadingPlugin = createPluginFactory<HeadingsPlugin>({
  key: 'heading',
  options: {
    levels: 6,
  },
  then: (editor, { options: { levels = 0 } = {} }) => {
    const plugins: Array<PlatePlugin<HeadingPlugin>> = [];

    for (let level = 1; level <= levels; level++) {
      const key = KEYS_HEADING[level - 1];

      const plugin: PlatePlugin<HeadingPlugin> = {
        key,
        isElement: true,
        deserializeHtml: {
          rules: [
            {
              validNodeName: `H${level}`,
            },
          ],
        },
        handlers: {
          onKeyDown: onKeyDownToggleElement,
        },
        options: {
          // we need to change this, so fork the code
          hotkey: [`ctrl+${level}`, `mod+shift+${level}`],
        },
      };

      plugins.push(plugin);
    }

    return {
      plugins,
    };
  },
});
