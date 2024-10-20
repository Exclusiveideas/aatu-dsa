

export interface NewsState {
    fetchedNews: Array<any>;
    lastDoc: null | any;
    fetchNewsError: string;
    isFetching: boolean;
    updateFetchedNews: (fetchedNews: Array<any>) => void;
    updateLastDoc: (lastDoc: any) => void;
    updateFetchedNewsError: (fetchNewsError: string) => void;
    updateIsFetching: (isFetching: boolean) => void;
  }

export interface FetchNewsProps {
  lastDoc: any | null; // Firestore document snapshot type
  updateFetchedNews: (news: any[]) => void;
  updateLastDoc: (doc: any) => void;
  updateFetchedNewsError: (error: string) => void;
  updateIsFetching: (isFetching: boolean) => void;
}