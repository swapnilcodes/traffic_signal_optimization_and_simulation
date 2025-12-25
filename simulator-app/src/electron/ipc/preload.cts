import {contextBridge, ipcRenderer} from 'electron';


contextBridge.exposeInMainWorld('electron', {
    greet: () => console.log('hii'),
});
