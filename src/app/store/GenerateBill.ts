import { create } from 'zustand'

export const useStore = create((set) => ({
  tableData: [],
  setTableData: () => set((state: any) => ({ tableData: state })),
  resetTableData: () => set({ tableData: [] }),
}))