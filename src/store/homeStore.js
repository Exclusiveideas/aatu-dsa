import { create } from "zustand";

const useHomeStore = create()((set) => ({
  isNavbarOpen: false,
  menuNavRef: null,
  menuNavWrapperRef: null,
  navbarRef: null,
  toggleNavbar: () =>
    set((state) => ({
      isNavbarOpen: !state.isNavbarOpen,
    })),
  setMenuNavRef: (ref) =>
    set(() => ({
      menuNavRef: ref,
    })),
  setMenuNavWrapperRef: (ref) =>
    set(() => ({
      menuNavWrapperRef: ref,
    })),
  setNavbarRef: (ref) =>
    set(() => ({
      navbarRef: ref,
    })),
}));

export default useHomeStore;
