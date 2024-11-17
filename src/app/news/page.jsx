"use client";

import { Suspense, useEffect, useState } from "react";
import "./singleNewsPage.css";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import HistoryIcon from "@mui/icons-material/History";
import useNewsStore from "@/store/newsStore";
import { fetchNews, getRandomNews } from "@/utils/newsFunctions";
import { Skeleton } from "@mui/material";
import { NewsPreview } from "@/components/newsGrid";
import SmoothScrolling from "@/components/smoothScrolling";
import MenuNav from "@/components/menuNav";
import useHomeStore from "@/store/homeStore";
import JellyBlob from "@/components/cursorCircle";

const NewsPageWithSuspense = () => (
  <Suspense
    fallback={
      <div className="pageSkeleton">
        <Skeleton
          variant="rounded"
          animation="wave"
          width={"80%"}
          height={"80%"}
          className="pageSkeleton_bone"
        />
      </div>
    }
  >
    <NewsPage />
  </Suspense>
);

export default NewsPageWithSuspense;

const demoImage = "/imgs/welcome.jpeg";

const NewsPage = () => {
  const searchParams = useSearchParams();
  const [currentNews, setCurrentNews] = useState({});
  const [extractedID, setExtractedID] = useState(null);

  const newsID = searchParams.get("newsID");

  const isNavbarOpen = useHomeStore((state) => state.isNavbarOpen);
  const fetchedNews = useNewsStore((state) => state.fetchedNews);
  const updateFetchedNews = useNewsStore((state) => state.updateFetchedNews);
  const updateFetchedNewsError = useNewsStore(
    (state) => state.updateFetchedNewsError
  );

  useEffect(() => {
    if (!newsID) return;

    setExtractedID(newsID);
  }, [newsID]);

  useEffect(() => {
    if (!extractedID) return;

    if (!fetchedNews[0]) {
      fetchNews({
        fetchedNews,
        updateFetchedNews,
        updateFetchedNewsError,
      });
    } else {
      fetchIDNews(extractedID);
    }
  }, [fetchedNews, extractedID]);

  const fetchIDNews = (id) => {
    const filteredArray = fetchedNews?.filter((item) => item?.id == id);
    setCurrentNews({ ...filteredArray[0] });
  };

  return (
    <SmoothScrolling>
      <div className="newsPageWrapper">
        <Navbar />
        <div className="headerSection">
          <div className="imgContainer">
            <div className="blackOverlay"></div>
            <img
              src={
                currentNews?.imageLink ? `${currentNews?.imageLink}` : demoImage
              }
              alt="news image"
            />
          </div>

          <div className="infoWrapper">
            {currentNews?.message ? (
              <h4 className="headerTxt">
                {currentNews?.title?.stringValue || "No title to show"}
              </h4>
            ) : (
              <Skeleton
                variant="text"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.445)" }}
                width={"60%"}
                height={"70px"}
              />
            )}
            <div className="postedTime">
              {currentNews?.message ? (
                <>
                  <HistoryIcon
                    sx={{
                      color: "white",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  />
                  <p>{currentNews?.createdOn || "no available date"}</p>
                </>
              ) : (
                <Skeleton
                  variant="text"
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.445)" }}
                  width={"20%"}
                  height={"70px"}
                />
              )}
            </div>
          </div>
        </div>
        <div className="newsBodySection">
          {currentNews?.message ? (
            <div className="newsBody">
              <TextContent
                content={
                  currentNews?.message?.stringValue || "Nothing to show you"
                }
              />
            </div>
          ) : (
            <Skeleton
              variant="rounded"
              animation="wave"
              width={"95%"}
              height={"350px"}
            />
          )}
        </div>
        {fetchedNews[0] ? (
          <div className="moreNewsSection">
            {getRandomNews(fetchedNews, currentNews?.id)?.map((news, i) => (
              <NewsPreview key={i} news={news} />
            ))}
          </div>
        ) : (
          <div className="moreNewsSection">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                animation="wave"
                width={"100%"}
                height={"400px"}
              />
            ))}
          </div>
        )}
        <MenuNav />
        {isNavbarOpen && <JellyBlob />}
      </div>
    </SmoothScrolling>
  );
};

const TextContent = ({ content }) => {
  const sanitizedContent = content
    .replace(/\n/g, "<br/>")
    .replace(/ /g, "&nbsp;");

  return (
    <div
      className="txtContent"
      style={{ whiteSpace: "pre-wrap" }}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};
