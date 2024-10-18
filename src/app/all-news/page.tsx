"use client";

import React, { useEffect, useState } from "react";
import "./allNews.css";
import Navbar from "@/components/navbar";
import { CircularProgress } from "@mui/material";
import Footer from "@/components/footer";

import { firestore } from "../../firebase/firebaseConfig";
import NewsPreview from "@/components/newsPreview";

const AllNewsPage = () => {
  const [fetchError, setFetchError] = useState("");

  const [newsItems, setNewsItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);

  useEffect(() => {
    // Fetch the initial news items
    // fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const newsCollection = firestore
        .collection("news")
        .orderBy("date", "desc")
        .limit(12);
      const snapshot = lastDoc
        ? await newsCollection.startAfter(lastDoc).get()
        : await newsCollection.get();
      const news = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewsItems((prevNewsItems) => [...prevNewsItems, ...news]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error fetching news:", error);
      setFetchError("Error fetching news - Try reloading the page.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreNews = () => {
    setVisibleCount((prevVisibleCount) => prevVisibleCount + 12);
    fetchNews();
  };

  return (
    <div className="allNewsWrapper">
      <Navbar allNewsPage />
      <div className="newsCollection">
        {/* {newsItems?.slice(0, visibleCount).map((newsItem) => (
          <NewsPreview key={newsItem.id} {...newsItem} />
        ))} */}
        {Array.from({ length: 12 }).map(() => (
          <NewsPreview allNewsPage={true} />
        ))}
      </div>
      <div className="loadMoreWrapper">
        {newsItems[0] && (
          <div className="loadMoreBtn" onClick={loadMoreNews}>
            {!loading && visibleCount < newsItems.length ? ( // checks if there are more news items to display than the currently visible count
              <>
                <p>Load More</p>
              </>
            ) : (
              <CircularProgress size="13px" className="circularProgress" />
            )}
          </div>
        )} 
        {fetchError && <p className="selectFile">{fetchError}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default AllNewsPage;
