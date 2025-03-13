import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  user:null,
  setUser:(value)=>set({user:value}),
  isAdmin:false,
  setIsAdmin:(value)=>set({isAdmin:value}),
}));

export default useAuthStore;
