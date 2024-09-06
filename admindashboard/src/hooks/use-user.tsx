import { create } from "zustand"

export const useUser = create<useUser>((set) => ({
   role: null,
   setRole: (role) => set({ role }),
}))
