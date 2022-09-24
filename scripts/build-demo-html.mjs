/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { cd } from 'zx';

/**
 * Put plugin into demo folder
 */
const pluginInfo = fs.readJsonSync('src/plugin.info');
const [_, __, author, name] = pluginInfo.title.split('/');
const pluginTitle = `${author}/${name}`;

const repoDirectory = path.resolve(__dirname, '..');
const distributionDirectory = path.join(repoDirectory, 'dist');
const jsonPluginFileName = `$__plugins_${pluginTitle.replace('/', '_')}.json`;
// copy demo
await fs.copy(path.join(repoDirectory, 'demo'), distributionDirectory);
// copy json plugin
await fs.copy(path.join(distributionDirectory, 'out', jsonPluginFileName), path.join(distributionDirectory, 'tiddlers', jsonPluginFileName));

/**
 * Make demo html file
 */
const htmlPath = `${distributionDirectory}/output/index.html`;

/**
 * Same as `cross-env TIDDLYWIKI_PLUGIN_PATH='node_modules/tiddlywiki/plugins/published' TIDDLYWIKI_THEME_PATH='${wikiFolderName}/themes'`
 *
 * But we don't need this, because we put the JSON plugin into the dist folder, it will be loaded automatically
 */
// process.env.TIDDLYWIKI_PLUGIN_PATH = `${distDir}/plugins`;

cd(distributionDirectory);
await $`tiddlywiki ${distributionDirectory} --build externalimages`;
await $`tiddlywiki ${distributionDirectory} --build externaljs`;
// build dll.js and config tw to load it
// original filename contains invalid char, will cause static server unable to load it
const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const htmlContentWithCorrectJsPath = htmlContent.replaceAll('%24%3A%2Fcore%2Ftemplates%2Ftiddlywiki5.js', 'tiddlywiki5.js');
await fs.writeFile(htmlPath, htmlContentWithCorrectJsPath);
