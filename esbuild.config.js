/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const esbuild = require('esbuild');
const { readJsonSync } = require('fs-extra');
const browserslist = require('browserslist');
const { esbuildPluginBrowserslist, resolveToEsbuildTarget } = require('esbuild-plugin-browserslist');

const pluginInfo = readJsonSync('src/plugin.info');
const [_, __, author, name] = pluginInfo.title.split('/');
const pluginTitle = `${author}/${name}`;
const packageJSON = readJsonSync('package.json');

esbuild
  .build({
    entryPoints: packageJSON.tsFiles.map((tsFileName) => `./src/${tsFileName}.ts`),
    bundle: true,
    minify: process.env.CI,
    outdir: `./dist/plugins/${pluginTitle}`,
    sourcemap: process.env.CI ? false : 'inline',
    format: 'cjs',
    external: ['$:/*', 'react', 'react-dom'],
    plugins: [
      esbuildPluginBrowserslist(browserslist('last 2 firefox versions'), {
        printUnknownTargets: false,
      }),
    ],
  })
  .catch((error) => console.error(error));
