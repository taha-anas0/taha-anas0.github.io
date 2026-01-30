import { INITIAL_Z_INDEX } from "#constants";
import create from "zustand";

const useWindowStore = create(immer((set)=>({
    windows : WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX +1,
    openWindow: (windowKey, data = null) => set((state) => {

    })
    closeWindow: (windowKey, data = null) => set((state) => {
        
    })

})))