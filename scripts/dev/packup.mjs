/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import path from 'path';
import fs from 'fs-extra';
import esbuild from 'esbuild';
import tw from 'tiddlywiki';
import { walkFilesAsync } from './utils.mjs';
import { config } from '../esbuild.config.mjs';

const packageJSON = fs.readJsonSync('package.json');
const SOURCE_DIRECTORY = 'src';
const DISTNATION_DIRECTORY = 'dist';
const WIKI_DIRECTORY = 'demo';
const WIKI_TIDDLERS_DIRECTORY = `${WIKI_DIRECTORY}/tiddlers`;
const DIST_WIKI_TIDDLERS_DIRECTORY = `${DISTNATION_DIRECTORY}/tiddlers`;
const ENTRANCE_EXT_LIST = new Set(['.ts', '.tsx', '.jsx', '.mjs']);
const pluginInfo = fs.readJsonSync('src/plugin.info');
const [_, __, author, name] = pluginInfo.title.split('/');
const pluginTitle = `${author}/${name}`;
const SRC_PLUGIN_DIRECTORY = path.join(SOURCE_DIRECTORY, `${pluginInfo['plugin-type']}s`, pluginTitle);
const DIST_PLUGIN_DIRECTORY = path.join(DISTNATION_DIRECTORY, `${pluginInfo['plugin-type']}s`, pluginTitle);

export const cleanDist = async () => {
  const distJsTiddler = /^.*\.js\.dist\.tid$/;
  await walkFilesAsync(DISTNATION_DIRECTORY, (dir) => {
    if (distJsTiddler.test(dir)) fs.rmSync(dir);
  });
  const distPluginTiddler = /^.*\.json\.dist\.json$/;
  await walkFilesAsync(WIKI_TIDDLERS_DIRECTORY, (dir) => {
    if (distPluginTiddler.test(dir)) fs.rmSync(dir);
  });
  fs.rmSync('dist', { recursive: true, force: true });
};

export const findAllEntries = async (previousEntryList) => {
  previousEntryList = previousEntryList || [];
  let entryChanged = false;
  const entryList = [];
  const outputMetaMap = {};
  await walkFilesAsync(SOURCE_DIRECTORY, (dir) => {
    const metaDirectory = `${dir.replace(path.extname(dir), '.js')}.meta`;
    const dirInfo = path.parse(dir);
    if (ENTRANCE_EXT_LIST.has(path.extname(dir).toLowerCase())) {
      if (fs.existsSync(metaDirectory)) {
        entryList.push(dir);
        if (!entryChanged && !previousEntryList.includes(dir)) entryChanged = true;
        outputMetaMap[`${path.join(dirInfo.dir, dirInfo.name)}.js`] = fs.readFileSync(metaDirectory).toString('utf8');
      }
    } else if (dir.endsWith('.css.meta')) {
      outputMetaMap[path.join(dirInfo.dir, dirInfo.name)] = fs.readFileSync(metaDirectory.replace('.js', '')).toString('utf8');
    }
  });
  if (!entryChanged) {
    const length_ = previousEntryList.length;
    for (let index = 0; index < length_; index++) {
      if (entryList.includes(previousEntryList[index])) continue;
      entryChanged = true;
      break;
    }
  }
  return [entryList, outputMetaMap, entryChanged];
};

export const buildEntries = async (entries, metaMap) => {
  // Build .ts, .tsx, .jsx to .js.dist.tid
  const buildResult = await esbuild.build({
    ...config,
    entryPoints: entries,
    incremental: true,
  });
  buildResult.outputFiles.forEach((out) => {
    const outKey = out.path.replace(path.resolve(DISTNATION_DIRECTORY), SOURCE_DIRECTORY).replace(`/plugins/${pluginTitle}`, '');
    const outName = outKey.replace(SRC_PLUGIN_DIRECTORY, '').replaceAll('/', '-');
    fs.writeFileSync(
      path.join(DISTNATION_DIRECTORY, 'tiddlers', `${outName}.dist.tid`),
      `${metaMap[outKey]}\n\n${out.text
        .replace('module.exports = ', '')
        // fix Cannot find module named 'react-dom/server
        .replace(' = __require("react-dom/server")', '')
        .replace(' = require("react-dom/server")', '')}`,
    );
  });
};

// .replaceAll(
//     /module\.exports\s*=\s*__toCommonJS\(demo_exports\)/g,
//     'Object.assign(exports, __toCommonJS(demo_exports))',
//   )

export const initTiddlyWiki = async (_$tw, arguments_) => {
  // copy demo
  await fs.copy(path.join(process.cwd(), 'demo'), DISTNATION_DIRECTORY);
  const $tw = tw.TiddlyWiki(_$tw);
  $tw.boot.argv = arguments_ || [DISTNATION_DIRECTORY];
  $tw.boot.boot();
  return $tw;
};

const ignoredExtString =
  packageJSON.ignoredExtensionsWhenBuildPlugin?.length > 0
    ? `|${packageJSON.ignoredExtensionsWhenBuildPlugin.map((ext) => ext.replace('.', '')).join('|')}`
    : '';
// eslint-disable-next-line security/detect-non-literal-regexp, security-node/non-literal-reg-expr
const excludeFiles = /^.*\.(tsx?|jsx|meta|swp|mjs)$|^\.(git|hg|lock-wscript|svn|DS_Store|(wafpickle-|_).*)$|^CVS$|^npm-debug\.log$/;

export const exportPlugins = ($tw, minify, exportToDistribution, exportToWiki) => {
  // Ignore ts, tsx, jsm and jsx
  if (exportToDistribution) {
    fs.mkdirsSync(DISTNATION_DIRECTORY);
    const directory = DIST_PLUGIN_DIRECTORY;
    const directoryStat = fs.statSync(directory);
    if (!directoryStat.isDirectory()) return;
  }
  const pluginInfo = $tw.loadPluginFolder(SOURCE_DIRECTORY, excludeFiles);
  const pluginTiddlerName = `${path.basename($tw.utils.generateTiddlerFilepath(pluginInfo.title, {}))}.json`;
  if (exportToWiki) fs.writeJSONSync(path.join(DIST_WIKI_TIDDLERS_DIRECTORY, `${pluginTiddlerName}.dist.json`), pluginInfo);
  if (exportToDistribution) fs.writeJSONSync(path.join('dist', 'tiddlers', pluginTiddlerName), pluginInfo);
};
