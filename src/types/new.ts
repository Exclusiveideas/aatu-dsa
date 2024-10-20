

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