"use client";

import React, { useEffect, useState } from "react";
import "./allNews.css";
import Navbar from "@/components/navbar";
import { CircularProgress, Skeleton } from "@mui/material";

import NewsPreview from "@/components/newsPreview";
import useNewsStore from "@/store/newsStore";
import { fetchNews } from "@/utils/newsFunctions";
import dynamic from "next/dynamic";

const DynamicFooter = dynamic(() => import('@/components/footer'), {
  loading: () => (
    <div className="footerSkeleton">
      <Skeleton variant="rounded" width={"100%"} height={"100%"} />
    </div>
  )
})



const AllNewsPage = () => {
  const [fetchError, setFetchError] = useState("");
  const [newsItems, setNewsItems] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);

  const fetchedNews = useNewsStore((state) => state.fetchedNews);
  const isFetching = useNewsStore((state) => state.isFetching);
  const fetchNewsError = useNewsStore((state) => state.fetchNewsError);


  const lastDoc = useNewsStore((state) => state.lastDoc);
  const updateFetchedNews = useNewsStore((state) => state.updateFetchedNews);
  const updateLastDoc = useNewsStore((state) => state.updateLastDoc);
  const updateFetchedNewsError = useNewsStore((state) => state.updateFetchedNewsError);
  const updateIsFetching = useNewsStore((state) => state.updateIsFetching);

  useEffect(() => {
    // Fetch the initial news items
    if (!fetchedNews[0]) {
      fetchNews({ lastDoc, updateFetchedNews, updateLastDoc, updateFetchedNewsError, updateIsFetching });
    } else {
      setNewsItems([...fetchedNews])
    }
  }, [fetchedNews]);



  const loadMoreNews = () => {
    setLoading(true);
    fetchNews({ lastDoc, updateFetchedNews, updateLastDoc, updateFetchedNewsError, updateIsFetching });
  };

  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching])

  useEffect(() => {
    setFetchError(fetchNewsError);
  }, [fetchNewsError])


  return (
    <div className="allNewsWrapper">
      <Navbar newPage />
      {newsItems[0] ? (
        <div className="newsCollection">
          {newsItems?.map((news, index) => (
            <NewsPreview key={index} news={news} allNewsPage={true} />
          ))}
        </div>
      ) : (
        <div className="newsCollection">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" animation="wave" className="skeletonClass" />
          ))}

        </div>
      )}
      <div className="loadMoreWrapper">
        {newsItems[0] && (
          <div className="loadMoreBtn" onClick={loadMoreNews}>
            {!loading ? (
              <>
                <p>Load More</p>
              </>
            ) : (
              <CircularProgress size="13px" className="circularProgress" />
            )}
          </div>
        )}
        {fetchError && <p className="errorText">{fetchError}</p>}
      </div>
      <DynamicFooter />
    </div>
  );
};

export default AllNewsPage;
