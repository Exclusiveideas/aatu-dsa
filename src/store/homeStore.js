import { create } from "zustand";

const useHomeStore = create()((set) => ({
  isNavbarOpen: false,
  menuItemClicked: false,
  menuNavRef: null,
  menuNavWrapperRef: null,
  navbarRef: null,
  isSceneReady: false,
  loadingScreen: false,
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
  setIsSceneReady: (val) =>
    set(() => ({
      isSceneReady: val,
    })),
  setLoadingScreen: (val) =>
    set(() => ({
      loadingScreen: val,
    })),
  setMenuIconClicked: (val) =>
    set(() => ({
      menuItemClicked: val,
    })),
}));

export default useHomeStore;
