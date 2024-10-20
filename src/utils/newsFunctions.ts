
import { firestore } from "@/firebase/firebaseConfig";
import useNewsStore from "@/store/newsStore";




export const fetchNews = async ({ lastDoc, updateFetchedNews, updateLastDoc, updateFetchedNewsError, updateIsFetching }: any) => {
    updateIsFetching(true);

    try {
      const newsCollection = firestore
        .collection("news")
        .orderBy("date", "desc")
        .limit(6);
      const snapshot = lastDoc
        ? await newsCollection.startAfter(lastDoc).get()
        : await newsCollection.get();
      const news = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      updateFetchedNews([...news])
      updateLastDoc(snapshot.docs[snapshot.docs.length - 1])
    } catch (error) {
    //   console.error("Error fetching news:", error);
    updateFetchedNewsError("Error fetching news - Try reloading the page.");
    } finally {
        updateIsFetching(false);
    }
  };