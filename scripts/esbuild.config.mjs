/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import browserslist from 'browserslist';
import { esbuildPluginBrowserslist } from 'esbuild-plugin-browserslist';
import fs from 'fs-extra';
import path from 'path';

const pluginInfo = fs.readJsonSync('src/plugin.info');
const [_, __, author, name] = pluginInfo.title.split('/');
const pluginTitle = `${author}/${name}`;
const packageJSON = fs.readJsonSync('package.json');

export const config = {
  write: false,
  entryPoints: packageJSON.tsFiles.map((tsFileName) =>
    path.resolve(__dirname, '..', 'src', `${tsFileName.replace('./src/', '').replace('src/', '').replace('.ts', '')}.ts`),
  ),
  bundle: true,
  // let tiddly-gittly/tw5-plugin-packer minify it, and let our fix of `module exports` works
  minify: false,
  outdir: `./dist/plugins/${author}/${name}`,
  outbase: 'src',
  sourcemap: process.env.CI ? false : 'inline',
  format: 'cjs',
  platform: 'browser',
  treeShaking: true,
  external: ['$:/*', 'react', 'react-dom'],
  plugins: [
    esbuildPluginBrowserslist(browserslist('defaults'), {
      printUnknownTargets: false,
    }),
  ],
};
