import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('electron', {
    greet: () => console.log('hii'),
    config: async (): Promise<boolean | never>=> await ipcRenderer.invoke('config'),
    readMaps: async (): Promise<string | never>=> await ipcRenderer.invoke('read_maps'), 
    writeMaps: async (data: string): Promise<boolean | never> => await ipcRenderer.invoke('write_maps', data) 
});
