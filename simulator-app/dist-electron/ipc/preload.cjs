"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electron', {
    greet: () => console.log('hii'),
    config: async () => await electron_1.ipcRenderer.invoke('config'),
    readMaps: async () => await electron_1.ipcRenderer.invoke('read_maps'),
    writeMaps: async (data) => await electron_1.ipcRenderer.invoke('write_maps', data)
});
