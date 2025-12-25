import { app, globalShortcut, BrowserWindow } from 'electron';
import path from 'path';
import { isDev, getPreloadPath } from './utilities.js';
app.on('ready', () => {
    // Disable Reloading
    globalShortcut.register('CommandOrControl+r', () => console.log('bruh'));
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        }
    });
    // Load localhost url if in development otherwise load static html file.
    if (isDev())
        mainWindow.loadURL('http://localhost:5173/');
    else
        mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
    // Listen to events here
    // ipcMain.handle('readFile', handleReadFile);
});
