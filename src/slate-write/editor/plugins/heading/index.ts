/** copied from plate's packages/nodes/heading/src/createHeadingPlugin.ts , modify the hotkey and limit of level */
/* eslint-disable unicorn/no-thenable */
import { Key, PlatePlugin, toPlatePlugin } from '@udecode/plate-common/react';
import { BaseHeadingPlugin } from '@udecode/plate-heading';

/**
 * Enables support for headings with configurable levels
 * (from 1 to 6).
 */
export const reactHeadingPlugin = toPlatePlugin(BaseHeadingPlugin, ({ plugin }) => ({
  plugins: (plugin as unknown as PlatePlugin).plugins.map((p: PlatePlugin) =>
    p.extend(({ editor, type }) => {
      const level = (p.key as string).at(-1);
      // update this from 3 to 6
      if (Number(level) > 6) return {};

      return {
        shortcuts: {
          ['toggleHeading' + level]: {
            keys: [
              // we need to change this, so fork the code (from `[Key.Mod, Key.Alt, level],`)
              [Key.Mod, level],
              [Key.Mod, Key.Shift, level],
            ],
            preventDefault: true,
            handler: () => {
              editor.tf.toggle.block({ type });
            },
          },
        },
      };
    })
  ),
}));
