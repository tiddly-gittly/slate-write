/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import archiver from 'archiver';

const pluginInfo = fs.readJsonSync('src/plugin.info');
const [_, __, author, name] = pluginInfo.title.split('/');
const pluginTitle = `${author}/${name}`;
const packageJSON = fs.readJsonSync('package.json');

const repoDir = path.join(__dirname, '..');
const distDir = path.join(__dirname, '..', 'dist');
const nodejsPluginOutDir = path.join(distDir, `${pluginInfo["plugin-type"]}s`, author, name);
// cross platform cp -r ${repoDir}/src/ ${nodejsPluginOutDir}/
const ignoredExtensions = packageJSON.ignoredExtensionsWhenBuildPlugin;
const copyOptions = {
  filter: (src, dest) => {
    if (!ignoredExtensions.some((extension) => src.endsWith(extension))) {
      // Return true to copy the item
      return true;
    }
  },
};
await fs.copy(path.join(repoDir, 'src'), nodejsPluginOutDir, copyOptions);

// https://gist.github.com/arnoson/3237697e8c61dfaf0356f814b1500d7b
async function cleanupEmptyFolders(folder) {
  if (!(await fs.stat(folder)).isDirectory()) return;
  let files = await fs.readdir(folder);

  if (files.length > 0) {
    await Promise.all(files.map((file) => cleanupEmptyFolders(path.join(folder, file))));
    // Re-evaluate files; after deleting subfolders we may have an empty parent
    // folder now.
    files = await fs.readdir(folder);
  }

  if (files.length == 0) {
    await fs.rmdir(folder);
  }
}
await cleanupEmptyFolders(nodejsPluginOutDir);

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
  const outPath = path.join(__dirname, '..', `${pluginInfo["plugin-type"]}s.zip`);
  await zipDirectory(path.join(__dirname, '..', 'dist'), outPath);
  await fs.move(outPath, path.join(distDir, 'out', `${pluginInfo["plugin-type"]}s.zip`));
}
