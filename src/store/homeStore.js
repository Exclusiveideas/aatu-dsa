import { create } from "zustand";

const useHomeStore = create()((set) => ({
  isNavbarOpen: false,
  menuItemClicked: false,
  menuNavRef: null,
  menuNavWrapperRef: null,
  navbarRef: null,
  isSceneReady: false,
  unMountLoadingScreen: false,
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
  setMenuIconClicked: (val) =>
    set(() => ({
      menuItemClicked: val,
    })),
  setUnMountLoadingScreen: (val) =>
    set(() => ({
      unMountLoadingScreen: val,
    })),
}));

export default useHomeStore;
