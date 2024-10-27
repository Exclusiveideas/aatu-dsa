
import { firestore } from "@/firebase/firebaseConfig";
import { collection, query, limit, startAfter, getDocs } from 'firebase/firestore';




export const fetchNews = async ({ lastDoc, updateFetchedNews, updateLastDoc, updateFetchedNewsError, updateIsFetching }) => {
    updateIsFetching(true);

    try {
      const newsQuery = query(
        collection(firestore, 'news'),
        // orderBy('date', 'desc'),
        limit(6),
        ...(lastDoc ? [startAfter(lastDoc)] : [])
      );

  
      const snapshot = await getDocs(newsQuery);
  
      const news = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc?._document.data.value.mapValue.fields,
      }));

      if(!news[0]) return;
      updateFetchedNews(news);
      updateLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    } catch {
      updateFetchedNewsError('Error fetching news - Try reloading the page.');
    } finally {
      updateIsFetching(false);
    }
  };

export function getRandomNews(array, excludedElement) {
  // Filter out the excluded element
  const filteredArray = array.filter((item) => item.id !== excludedElement);

  // Ensure the filtered array has at least 3 items
  if (filteredArray.length < 4) {
    return filteredArray;
  }

  const result = [];
  const indices = new Set(); // To store unique indices

  while (result.length < 4) {
    const randomIndex = Math.floor(Math.random() * filteredArray.length);

    // Check if this index has already been chosen
    if (!indices.has(randomIndex)) {
      indices.add(randomIndex); // Add to the set of indices
      result.push(filteredArray[randomIndex]); // Add the item to the result
    }
  }

  return result;
}