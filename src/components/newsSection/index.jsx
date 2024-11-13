"use client";

import { useEffect, useRef, useState } from "react";
import "./newsSection.css";
import useNewsStore from "@/store/newsStore";
import { fetchNews } from "@/utils/newsFunctions";
import NewsGrid from "../newsGrid";
import FadeLoader from "react-spinners/FadeLoader";
 
const NewsSection = ({ setNewsMaskingRef, setChildAnimationComplete, childHeight }) => {
  const [availableNews, setAvailableNews] = useState([]);
  
  const containerRef = useRef();

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
    <div ref={containerRef} className="newsSection">
      <NewsGrid setNewsMaskingRef={setNewsMaskingRef} setChildAnimationComplete={setChildAnimationComplete} childHeight={childHeight} />
      <div className="loadingIndicator">
        <FadeLoader />
      </div>
      {/* <div className="newsSectHeader">
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
            <div className="newsTopPriority skeleton">
              <Skeleton variant="rounded" animation="wave" className="newsTopPSkeleton"
            />
              <Skeleton variant="rounded" animation="wave" className="newsTopPSkeleton"
            />
            </div>
            
            <div className="newslesserPriority skeleton">
              <Skeleton variant="rounded" animation="wave" className="newsLesserPSkeleton"
              />
              <Skeleton variant="rounded" animation="wave" className="newsLesserPSkeleton"
              />
              <Skeleton variant="rounded" animation="wave" className="newsLesserPSkeleton"
              />
              <Skeleton variant="rounded" animation="wave" className="newsLesserPSkeleton"
              />
            </div>
            
          </div>
        )}
      </div> */}
    </div>
  );
};

export default NewsSection;