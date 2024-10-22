import { create } from "zustand";
import { PortalState } from "@/types/auth";

const usePortalStore = create<PortalState>()(
    (set) => ({
      mobileNavbarOpen: false,
      changePicModalOpen: false,
      toggleMobileNavbar: () =>
        set((state) => ({
          mobileNavbarOpen: !state.mobileNavbarOpen,
        })),
      toggleChangePicModal: () =>
        set((state) => ({
          changePicModalOpen: !state.changePicModalOpen,
        })),
      
    })
);

export default usePortalStore;
