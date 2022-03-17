const repoDir = path.resolve(__dirname, '..');
const pluginDistDir = path.join(repoDir, 'dist', 'plugins', 'linonetwo', 'slate-write');
// cross platform cp -r ${repoDir}/src/ ${pluginDistDir}/
fs.copy(path.join(repoDir, 'src'), pluginDistDir, {
  filter: (src, dest) => {
    if (!src.endsWith('.ts')) {
      // Return true to copy the item
      return true;
    }
  },
});
