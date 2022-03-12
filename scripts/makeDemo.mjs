const repoDir = path.resolve(__dirname, '..');
const distDir = path.join(repoDir, 'dist');
const jsonPluginFileName = '%24%3A%2Fplugins%2Flinonetwo%2Fslate-write.json'
// copy demo
fs.copy(path.join(repoDir, 'demo'), distDir);
// copy json plugin
fs.copy(path.join(distDir, 'output', jsonPluginFileName), path.join(distDir, 'tiddlers', jsonPluginFileName));
