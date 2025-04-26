import { create } from 'zustand'

export type GenerateStore = {
    selectedSections: {
        [key: string]: number | null
    }
    write: (state: Partial<GenerateStore>) => void
}

export const useGenerateStore = create<GenerateStore>((set) => ({
    selectedSections: {
        section1: null,
        section2: null,
        section3: null,
        section4: null
    },
    write: (state) => set(state)
}))
