const repoDir = path.resolve(__dirname, '..');
await $`
cd ${path.join(repoDir, 'dist')} && \
npx cross-env \
    TIDDLYWIKI_PLUGIN_PATH='./plugins' \
    npx tiddlywiki . \
    --makelibrary $:/UpgradeLibrary \
    --savelibrarytiddlers $:/UpgradeLibrary '[prefix[$:/plugins/linonetwo/]]' ./
`;
