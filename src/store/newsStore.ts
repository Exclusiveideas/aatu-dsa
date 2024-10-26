import { NewsState } from "@/types/new";
import { create } from "zustand";

const useNewsStore = create<NewsState>()(
    (set) => ({
      fetchedNews: [],
      lastDoc: null,
      fetchNewsError: "",
      isFetching: false,
      updateFetchedNews: (fetchedNews: Array<any>) =>
        set((state) => ({
            fetchedNews: [...state.fetchedNews, ...fetchedNews ],
        })),
      updateLastDoc: (lastDoc) =>
        set(() => ({
          lastDoc: lastDoc,
        })),
      updateFetchedNewsError: (fetchNewsError: string) =>
        set(() => ({
          fetchNewsError: fetchNewsError,
        })),
      updateIsFetching: (isFetching: boolean) =>
        set(() => ({
          isFetching: isFetching,
        })),
    }),
);


export default useNewsStore;
