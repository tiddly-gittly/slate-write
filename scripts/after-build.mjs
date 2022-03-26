/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import archiver from 'archiver';

const pluginInfo = fs.readJsonSync('src/plugin.info');
const [_, __, author, name] = pluginInfo.title.split('/');
const pluginTitle = `${author}/${name}`;

const repoDir = path.join(__dirname, '..');
const distDir = path.join(__dirname, '..', 'dist');
const nodejsPluginOutDir = path.join(distDir, 'plugins', author, name);
// cross platform cp -r ${repoDir}/src/ ${nodejsPluginOutDir}/
const copyOptions = {
  filter: (src, dest) => {
    if (!src.endsWith('.ts')) {
      // Return true to copy the item
      return true;
    }
  },
};
await fs.copy(path.join(repoDir, 'src'), nodejsPluginOutDir, copyOptions);

// zip folder for nodejs wiki
/**
 * @param {String} source
 * @param {String} out
 * @returns {Promise}
 */
function zipDirectory(source, out) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', (err) => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
}

if (process.env.CI) {
  const outPath = path.join(__dirname, '..', 'plugins.zip');
  await zipDirectory(path.join(__dirname, '..', 'dist'), outPath);
  await fs.move(outPath, path.join(distDir, 'out', 'plugins.zip'));
}
