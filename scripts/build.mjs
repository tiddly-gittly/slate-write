/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import esbuild from 'esbuild';
import fs from 'fs-extra';
import path from 'path';
import { config } from './esbuild.config.mjs';

const pluginInfo = fs.readJsonSync('src/plugin.info');
const [_, __, author, name] = pluginInfo.title.split('/');

const result = await esbuild.build(config);

for (const out of result.outputFiles) {
  // fix esbuild `module.exports = ` causing library not recognizable
  await fs.mkdirp(path.dirname(out.path));
  await fs.writeFile(out.path, new TextDecoder().decode(out.contents).replace('module.exports = ', ''), 'utf8');
}
