import { app } from 'electron';
import path from 'path';
function isDev() {
    return process.env.NODE_ENV === 'dev';
}
function getPreloadPath() {
    if (isDev())
        return path.join(app.getAppPath(), '/dist-electron/ipc/preload.cjs');
    return path.join(app.getAppPath(), '../dist-electron/ipc/preload.cjs');
}
export { isDev, getPreloadPath };
