import { create } from "zustand";

const useSnackbarStore = create()((set) => ({
  snackbarMessage: "",
  snackbarInitiated: false,
  snackbarVariant: 'success', // success | error
  updateSnackbarMessage: (mssg) =>
    set(() => ({
      snackbarMessage: mssg,
    })),
  updateSnackbarInitiated: () =>
    set((state) => ({
        snackbarInitiated: !state.snackbarInitiated,
    })),
  updateSnackbarVariant: (variant) =>
    set(() => ({
        snackbarVariant: variant,
    })),
}));

export default useSnackbarStore;
