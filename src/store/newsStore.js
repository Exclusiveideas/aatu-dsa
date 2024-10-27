import { create } from "zustand";

const useNewsStore = create()(
    (set) => ({
      fetchedNews: [],
      lastDoc: null,
      fetchNewsError: "",
      isFetching: false,
      updateFetchedNews: (fetchedNews) =>
        set((state) => ({
            fetchedNews: [...state.fetchedNews, ...fetchedNews ],
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
);


export default useNewsStore;
