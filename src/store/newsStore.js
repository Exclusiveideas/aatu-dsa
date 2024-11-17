import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNewsStore = create()(
  persist(
    (set) => ({
      fetchedNews: [],
      lastDoc: null,
      fetchNewsError: "",
      isFetching: false,
      updateFetchedNews: (updatedNewsList) =>
        set((state) => ({
          fetchedNews: updatedNewsList,
        })),
      updateLastDoc: (lastDoc) =>
        set(() => ({
          lastDoc: lastDoc,
        })),
      updateFetchedNewsError: (fetchNewsError) =>
        set(() => ({
          fetchNewsError: fetchNewsError,
        })),
      updateIsFetching: (isFetching) =>
        set(() => ({
          isFetching: isFetching,
        })),
    }),
    {
      name: "school-updates",
    }
  )
);

export default useNewsStore;
