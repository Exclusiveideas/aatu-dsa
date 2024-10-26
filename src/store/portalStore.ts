import { create } from "zustand";
import { PortalState } from "@/types/auth";

const usePortalStore = create<PortalState>()(
    (set) => ({
      mobileNavbarOpen: false,
      changePicModalOpen: false,
      changeImageSelected: false,
      toggleMobileNavbar: () =>
        set((state) => ({
          mobileNavbarOpen: !state.mobileNavbarOpen,
        })),
      toggleChangePicModal: (val: boolean) =>
        set(() => ({
          changePicModalOpen: val,
        })),
      toggleImageSelected: (val: boolean) =>
        set(() => ({
          changeImageSelected: val,
        })),
      
    })
);

export default usePortalStore;
