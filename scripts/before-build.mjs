const repoDir = path.resolve(__dirname, '..');
const pluginDistDir = path.join(repoDir, 'dist', 'plugins', 'linonetwo', 'slate-write');
// cross platform cp -r ${repoDir}/src/ ${pluginDistDir}/
fs.copy(path.join(repoDir, 'src'), pluginDistDir);
// copy demo
fs.copy(path.join(repoDir, 'demo'), path.join(repoDir, 'dist'));
