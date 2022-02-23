const repoDir = __dirname;
const distDir = path.join(repoDir, 'dist', 'plugins', 'linonetwo', 'slate-write');
fs.mkdirp(distDir);
// cross platform cp -r ${repoDir}/src/ ${distDir}/
fs.copy(path.join(repoDir, 'src'), distDir);
