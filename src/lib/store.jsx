import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      credentials: null,
      setCredentials: (credentials) => {
        set(() => ({ credentials: credentials }));
        console.log("Credentials set!!");
      },
      clearCredentials: () => {
        set(() => ({ credentials: null }));
        console.log("Credentials cleared!!");
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
