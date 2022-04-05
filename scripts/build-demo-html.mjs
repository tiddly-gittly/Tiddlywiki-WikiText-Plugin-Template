import { cd } from 'zx';

/**
 * Put plugin into demo folder
 */
const pluginInfo = fs.readJsonSync('src/plugin.info');
const [_, __, author, name] = pluginInfo.title.split('/');
const pluginTitle = `${author}/${name}`;

const repoDir = path.resolve(__dirname, '..');
const distDir = path.join(repoDir, 'dist');
const jsonPluginFileName = `$__plugins_${pluginTitle.replace('/', '_')}.json`;
// copy demo
await fs.copy(path.join(repoDir, 'demo'), distDir);
// copy json plugin
await fs.copy(path.join(distDir, 'out', jsonPluginFileName), path.join(distDir, 'tiddlers', jsonPluginFileName));

cd(distDir);
await $`tiddlywiki ${distDir} --build index`;
