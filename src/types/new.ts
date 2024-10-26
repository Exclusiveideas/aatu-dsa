

export interface NewsState {
    fetchedNews: Array;
    lastDoc: null;
    fetchNewsError: String;
    isFetching: boolean;
    updateFetchedNews: (fetchedNews: Array) => void;
    updateLastDoc: (lastDoc) => void;
    updateFetchedNewsError: (fetchNewsError: String) => void;
    updateIsFetching: (isFetching: boolean) => void;
  }

export interface FetchNewsProps {
  updateFetchedNews: (news[]) => void;
  updateLastDoc: (doc) => void;
  updateFetchedNewsError: (error: String) => void;
  updateIsFetching: (isFetching: boolean) => void;
}