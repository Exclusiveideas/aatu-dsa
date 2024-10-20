import { NewsState } from "@/types/new";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNewsStore = create<NewsState>()(
  persist(
    (set) => ({
      fetchedNews: [],
      lastDoc: null,
      fetchNewsError: "",
      isFetching: false,
      updateFetchedNews: (fetchedNews: Array<any>) =>
        set((state) => ({
            fetchedNews: [...state.fetchedNews, ...fetchedNews ],
        })),
      updateLastDoc: (lastDoc: any) =>
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
    {
      name: "fetched-News",
    }
  )
);

export default useNewsStore;
