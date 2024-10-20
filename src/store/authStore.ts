import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, Student } from "@/types/auth";

const useAuthStore = create<AuthState>()(
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

      updateIsAuthenticated: (isAuthenticated: boolean) =>
        set(() => ({
          isAuthenticated: isAuthenticated,
        })),
      updateStudent: (student: Student) =>
        set(() => ({
          student: student,
        })),
      updateToken: (token: null | string) =>
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
