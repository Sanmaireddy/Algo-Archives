const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getNames: async () => {
    return await ipcRenderer.invoke("get-names");
  },
});
