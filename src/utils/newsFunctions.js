import { firestore } from "@/firebase/firebaseConfig";
import {
  collection,
  query,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";

export const fetchNews = async ({
  lastDoc,
  fetchedNews,
  updateFetchedNews,
  updateLastDoc,
  updateFetchedNewsError,
  updateIsFetching,
  updateNoMoreNews,
}) => {
  if (updateIsFetching) updateIsFetching(true);

  try {
    const newsQuery = query(
      collection(firestore, "news"),
      limit(6),
      ...(lastDoc ? [startAfter(lastDoc)] : [])
    );

    const snapshot = await getDocs(newsQuery);

    if (snapshot?.empty) {
      if (updateNoMoreNews) updateNoMoreNews(true);
      return;
    }

    const newFetchedNews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc?._document.data.value.mapValue.fields,
    }));

    if (!newFetchedNews[0]) return;

    const existingNewsIds = new Set(fetchedNews.map((item) => item.id)); 
    const filteredNews = newFetchedNews.filter(
      (item) => !existingNewsIds.has(item.id)
    );

    if (filteredNews.length > 0) {
      updateFetchedNews([...fetchedNews, ...filteredNews]);
    }

    if (updateLastDoc) updateLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    if (updateNoMoreNews) updateNoMoreNews(false);
  } catch {
    updateFetchedNewsError("Error fetching news - Try reloading the page.");
  } finally {
    if (updateIsFetching) updateIsFetching(false);
  }
};

export function getRandomNews(array, excludedElement) {
  const filteredArray = array.filter((item) => item.id !== excludedElement);

  if (filteredArray.length < 4) {
    return filteredArray;
  }

  const result = [];
  const indices = new Set();

  while (result.length < 4) {
    const randomIndex = Math.floor(Math.random() * filteredArray.length);

    if (!indices.has(randomIndex)) {
      indices.add(randomIndex);
      result.push(filteredArray[randomIndex]);
    }
  }

  return result;
}


export function truncateString(str) {
  return str.length > 45 ? str.slice(0, 45) + '...' : str;
}
