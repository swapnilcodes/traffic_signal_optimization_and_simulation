import {app, globalShortcut, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import {isDev, getPreloadPath} from './utilities.js';
import { createConfigFiles, readMaps, writeMaps} from './services/storage.js';

app.on('ready', ()=>{
    // Disable Reloading
    globalShortcut.register('CommandOrControl+r', ()=>console.log('bruh'));
        
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        },
        width: 1200,
        height: 800 
    });
    console.log(app.getPath('userData'));
    // Load localhost url if in development otherwise load static html file.
    if(isDev())
        mainWindow.loadURL('http://localhost:5173/');
    else
        mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
    
    ipcMain.handle('config', createConfigFiles);
    ipcMain.handle('read_maps', readMaps);
    ipcMain.handle('write_maps', writeMaps);
});
