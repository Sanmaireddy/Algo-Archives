const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getNames: async () => {
    return await ipcRenderer.invoke("get-names");
  },
  getFolders: async () => {
    return await ipcRenderer.invoke("get-folders");
  },
  getPlatformNames: async () => {
    return await ipcRenderer.invoke("get-platformNames");
  },
  addPlatform: async (newPlatform) => {
    return await ipcRenderer.invoke("add-platform", newPlatform);
  },
  addNote: async (note) => {
    return await ipcRenderer.invoke("add-note", note);
  },
  getPlatformNotes: async (platform) => {
    return await ipcRenderer.invoke("get-platformNotes", platform);
  },
});
