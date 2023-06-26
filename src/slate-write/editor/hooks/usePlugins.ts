import { createPlugins } from '@udecode/plate-core';
import { createNodeIdPlugin } from '@udecode/plate-node-id';
import { useMemo } from 'react';

import { components } from '../components';
import * as PLUGINS from '../config/plugins';

interface IUsePluginsContext {
  idCreator: () => string;
}

const defaultPlugins = createPlugins([...PLUGINS.basicElements, ...PLUGINS.basicMarks, ...PLUGINS.utils, ...PLUGINS.twAdvancedElements], {
  // Plate components
  components,
});

export function usePlugins({ idCreator }: IUsePluginsContext) {
  // id plugin is vital for drag&drop
  const idPlugin = useMemo(
    () =>
      createNodeIdPlugin({
        options: {
          idCreator,
        },
      }),
    [idCreator],
  );
  const plugins = useMemo(() => createPlugins([...defaultPlugins, idPlugin]), [idPlugin]);
  return plugins;
}
