import { create } from "zustand";

type imagenes = {
    url: string;
    guardarUrl: (value: string) => void;
}

export const useStoreImagen = create<imagenes>((set) => ({
    url: '',
    guardarUrl: (value) => set({ url: value })
}
));