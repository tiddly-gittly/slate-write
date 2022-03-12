const { execSync } = require('child_process');

const repoFolder = path.join(path.dirname(__filename), '..', 'dist');
const htmlPath = `${repoFolder}/output/index.html`;

// cross-env TIDDLYWIKI_PLUGIN_PATH='node_modules/tiddlywiki/plugins/published' TIDDLYWIKI_THEME_PATH='${wikiFolderName}/themes'
process.env.TIDDLYWIKI_PLUGIN_PATH = `${repoFolder}/plugins`;

const execAndLog = (command, options) => console.log(String(execSync(command, options)));

// npm run build:nodejs2html
execAndLog(`tiddlywiki ${repoFolder} --build externalimages`, { cwd: repoFolder });
execAndLog(`tiddlywiki ${repoFolder} --build externaljs`, { cwd: repoFolder });
// build dll.js and config tw to load it
// original filename contains invalid char, will cause static server unable to load it
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const htmlContentWithCorrectJsPath = htmlContent.replaceAll('%24%3A%2Fcore%2Ftemplates%2Ftiddlywiki5.js', 'tiddlywiki5.js');
fs.writeFileSync(htmlPath, htmlContentWithCorrectJsPath);
