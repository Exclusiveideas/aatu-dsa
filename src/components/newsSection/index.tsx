"use client";

import React, { useEffect, useState } from "react";
import "./newsSection.css";
import NewsPreview from "../newsPreview";
import useNewsStore from "@/store/newsStore";
import { Skeleton } from "@mui/material";
import { fetchNews } from "@/utils/newsFunctions";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from "next/link";

const NewsSection = () => {
  const [availableNews, setAvailableNews] = useState<Array<any>>([])

  const fetchedNews = useNewsStore((state) => state.fetchedNews);
  const lastDoc = useNewsStore((state) => state.lastDoc);
  const updateFetchedNews = useNewsStore((state) => state.updateFetchedNews);
  const updateLastDoc = useNewsStore((state) => state.updateLastDoc);
  const updateFetchedNewsError = useNewsStore((state) => state.updateFetchedNewsError);
  const updateIsFetching = useNewsStore((state) => state.updateIsFetching);

  useEffect(() => {
    if(fetchedNews[0]) {
      setAvailableNews([...fetchedNews])
    } else {
      fetchNews({ lastDoc, updateFetchedNews, updateLastDoc, updateFetchedNewsError, updateIsFetching });
    }
  }, [fetchedNews])
  

  return (
    <div className="newsSection">
      <div className="newsSectHeader">
        <div className="headerText">
          <h2>News & Updates</h2>
        </div>
        <Link href="/all-news"  className="moreNewsTxt">
          <p>More News</p>
          <KeyboardArrowRightIcon
            sx={{
              color: "black",
              cursor: "pointer",
              fontSize: "20px",
            }}
          />
        </Link>
      </div>
      <div className="newPreviews">
        {availableNews[0] ? (
          <>
          <div className="newsTopPriority">
            <NewsPreview news={fetchedNews[0]} topP firstTopP />
            <NewsPreview news={fetchedNews[1]} topP />
          </div>
        
        <div className="newslesserPriority">
          {Array.from({ length: 4 }).map((_, index) => (
            <NewsPreview key={index} news={fetchedNews[index + 2]} />
          ))}
        </div> 
        </>) : (
          <div className="skeletonCont">
            <div className="newsTopPriority">
              <Skeleton variant="rounded" animation="wave" width={"60%"} height={"100%"}
            />
              <Skeleton variant="rounded" animation="wave" width={"40%"} height={"100%"}
            />
            </div>
            
            <div className="newslesserPriority">
              <Skeleton variant="rounded" animation="wave" width={"25%"} height={"100%"}
              />
              <Skeleton variant="rounded" animation="wave" width={"25%"} height={"100%"}
              />
              <Skeleton variant="rounded" animation="wave" width={"25%"} height={"100%"}
              />
              <Skeleton variant="rounded" animation="wave" width={"25%"} height={"100%"}
              />
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsSection;

{
  /* <div className="skeletonCont">
<Skeleton variant="rounded" animation="wave" width={"100%"} height={"30%"} />
<div className="midSkeleton">
  <Skeleton variant="rounded" animation="wave" width={"30%"} height={"100%"} />
  <Skeleton variant="rounded" animation="wave" width={"30%"} height={"100%"} />
  <Skeleton variant="rounded" animation="wave" width={"30%"} height={"100%"} />
</div>
<Skeleton variant="rounded" animation="wave" width={"100%"} height={"35%"} />
</div> */
}
