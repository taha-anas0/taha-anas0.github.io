import { INITIAL_Z_INDEX } from "#constants";
import create from "zustand";

const useWindowStore = create(immer((set)=>({
    windows : WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX +1,
    openWindow: (windowKey, data = null) => set((state) => {
      const win = state.windows[windowKey];
      win.isOpen = true;
      win.zIndex = state.nextZIndex;
      win.data = data?? win.data;
      state.nextZIndex++;

    }),
    closeWindow: (windowKey, data = null) => set((state) => {
      const win = state.windows[windowKey];
      win.isOpen = false;
      win.zIndex = state.INITIAL_Z_INDEX;
      win.data = null;
    }),
    focusWindow: (windowKey) => set((state) => {
      const win = state.windows[windowKey];
    
      win.zIndex = state.INITIAL_Z_INDEX;
      win.data = null;
    })

})))