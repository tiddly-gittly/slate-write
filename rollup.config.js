import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import disablePackages from 'rollup-plugin-disable-packages';

export default {
  input: 'src/md-to-tid-button.ts',
  output: {
    file: '../../dist/plugins/linonetwo/slate-write/md-to-tid-button.js',
    format: 'commonjs',
    sourcemap: 'inline',
    exports: 'named'
  },
  external: [
    'events',
    'fs',
    'fsevents',
    'util',
    'path',
    'os',
    'stream'
  ],
  plugins: [
    nodeResolve({ browser: true }),
    commonjs(),
    typescript(),
    json(),

    // We are not able to bundle in fsevents since it is a native osx lib.
    // It will give us errors if we don't disable (replace it with noop) it.
    // We must also use `useFsEvents: false` when calling chokidar.watch.
    disablePackages('fsevents')
  ]
};