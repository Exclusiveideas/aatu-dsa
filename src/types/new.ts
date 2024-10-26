

export interface NewsState {
    fetchedNews: Array<any>;
    lastDoc: null | any;
    fetchNewsError: string;
    isFetching: boolean;
    updateFetchedNews: (fetchedNews: Array<any>) => void;
    updateLastDoc: (lastDoc) => void;
    updateFetchedNewsError: (fetchNewsError: string) => void;
    updateIsFetching: (isFetching: boolean) => void;
  }

export interface FetchNewsProps {
  lastDoc | null; // Firestore document snapshot type
  updateFetchedNews: (news[]) => void;
  updateLastDoc: (doc) => void;
  updateFetchedNewsError: (error: string) => void;
  updateIsFetching: (isFetching: boolean) => void;
}