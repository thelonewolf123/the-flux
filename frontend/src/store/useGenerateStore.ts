import { create } from 'zustand'

export type GenerateStore = {
    write: (state: Partial<GenerateStore>) => void
}
const useGenerateStore = create<GenerateStore>((set) => ({
    selectedSections: {},
    write: (state) => set(state)
}))
