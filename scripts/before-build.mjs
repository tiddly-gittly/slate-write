const repoDir = path.resolve(__dirname, '..');
const distDir = path.join(repoDir, 'dist', 'plugins', 'linonetwo', 'slate-write');
// cross platform cp -r ${repoDir}/src/ ${distDir}/
fs.copy(path.join(repoDir, 'src'), distDir);
