import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create()(
  persist(
    (set) => ({
      isAuthenticated: false,
      student: null,
      token: null,
      logout: () =>
        set(() => ({
          isAuthenticated: false,
          student: null,
          token: null,
        })),
      updateIsAuthenticated: (isAuthenticated) =>
        set(() => ({
          isAuthenticated: isAuthenticated,
        })),
      updateStudent: (student) =>
        set(() => ({
          student: student,
        })),
      updateToken: (token) =>
        set(() => ({
          token: token,
        })),
    }),
    {
      name: "student-authenticated",
    }
  )
);

export default useAuthStore;