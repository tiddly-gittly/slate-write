/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import chokidar from 'chokidar';
import tw from 'tiddlywiki';
import fs from 'fs-extra';
import path from 'path';
import getPort from 'get-port';
import { WebSocketServer, WebSocket } from 'ws';
import { findAllEntries, buildEntries, exportPlugins, initTiddlyWiki } from './packup.mjs';

// WebSocket with TiddlyWiki on broswer
const developmentWebListenerScriptPath = path.resolve(path.join(process.cwd(), 'scripts', 'dev', 'devweb-listener.js'));
const developmentWebListenerScript = fs.readFileSync(developmentWebListenerScriptPath).toString('utf8');
const wssPort = await getPort({ port: 8081 });
const refreshHeartBeat = (ws) => {
  ws.isAlive = true;
  if (ws.heartBeatInterval) clearInterval(ws.heartBeatInterval);
  ws.heartBeatInterval = setInterval(() => {
    if (ws.isAlive === false) {
      clearInterval(ws.heartBeatInterval);
      delete ws.heartBeatInterval;
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  }, 15_000);
};
const wss = new WebSocketServer({ port: wssPort });
wss.on('connection', (ws) => {
  refreshHeartBeat(ws);
  ws.ping();
  ws.on('pong', () => {
    refreshHeartBeat(ws);
  });
  ws.on('close', () => {
    if (ws.heartBeatInterval) clearInterval(ws.heartBeatInterval);
  });
});
wss.on('close', () => {
  wss.clients.forEach((ws) => {
    if (ws.heartBeatInterval) clearInterval(ws.heartBeatInterval);
    ws.send('bye');
  });
});

const $tw1 = await initTiddlyWiki();
let $tw2;
let twServer;
// Watch source files change
const watcher = chokidar.watch('src', {
  ignoreInitial: true,
  followSymlinks: true,
  ignored: /^.*\.(swp|js\.dist\.tid)$|^\.(git|hg|lock-wscript|svn|DS_Store|(wafpickle-|_).*)$|^CVS$|^npm-debug\.log$/,
  awaitWriteFinish: {
    stabilityThreshold: 1000,
    pollInterval: 100,
  },
});
const refresh = async () => {
  try {
    const [entryList, metaMap, _] = await findAllEntries();
    await buildEntries(entryList, metaMap);
    exportPlugins($tw1, false, false, true);
  } catch (error) {
    console.error(error);
    return;
  }
  if (twServer) twServer.close();
  $tw2 = tw.TiddlyWiki();
  $tw2.boot.argv = ['dist', '--listen'];
  $tw2.preloadTiddler({ title: '$:/Modern.TiddlyDev/devWebsocket/port', text: `${wssPort}` });
  $tw2.preloadTiddler({
    title: '$:/Modern.TiddlyDev/devWebsocket/listener',
    text: developmentWebListenerScript,
    type: 'application/javascript',
    'module-type': 'startup',
  });
  $tw2.hooks.addHook('th-server-command-post-start', (_listenCommand, server, _nodeServer) => {
    twServer = server;
    wss.clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) ws.send('refresh');
    });
  });
  $tw2.boot.boot();
};
/* eslint-disable @typescript-eslint/no-misused-promises */
watcher.on('ready', refresh);
watcher.on('add', refresh);
watcher.on('change', refresh);
