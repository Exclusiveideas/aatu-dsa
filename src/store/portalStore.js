import { create } from "zustand";

const usePortalStore = create()(
    (set) => ({
      mobileNavbarOpen: false,
      changePicModalOpen: false,
      changeImageSelected: false,
      toggleMobileNavbar: () =>
        set((state) => ({
          mobileNavbarOpen: !state.mobileNavbarOpen,
        })),
      toggleChangePicModal: (val) =>
        set(() => ({
          changePicModalOpen: val,
        })),
      toggleImageSelected: (val) =>
        set(() => ({
          changeImageSelected: val,
        })),
      
    })
);

export default usePortalStore;
