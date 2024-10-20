"use client";

import React, { useEffect, useState } from "react";
import "./singleNewsPage.css";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import HistoryIcon from "@mui/icons-material/History";
import NewsPreview from "@/components/newsPreview";
import useNewsStore from "@/store/newsStore";
import { fetchNews, getRandomNews } from "@/utils/newsFunctions";
import { Skeleton } from "@mui/material";

const demoImage = "/welcome.jpeg";

const NewsPage = () => {
  const searchParams = useSearchParams();
  const [currentNews, setCurrentNews] = useState<any>({});
  const [extractedID, setExtractedID] = useState<string | null>(null);

  const fetchedNews = useNewsStore((state) => state.fetchedNews);
  const lastDoc = useNewsStore((state) => state.lastDoc);
  const updateFetchedNews = useNewsStore((state) => state.updateFetchedNews);
  const updateLastDoc = useNewsStore((state) => state.updateLastDoc);
  const updateFetchedNewsError = useNewsStore(
    (state) => state.updateFetchedNewsError
  );
  const updateIsFetching = useNewsStore((state) => state.updateIsFetching);

  useEffect(() => {
    // Extract the newsID whenever searchParams changes
    const newsID = searchParams.get("newsID");
    setExtractedID(newsID);
  }, [searchParams]);

  useEffect(() => {
    if (extractedID && fetchedNews[0]) {
      fetchIDNews(extractedID);
    }
  }, [extractedID]);

  useEffect(() => {
    // Fetch the initial news items
    if (!fetchedNews[0]) {
      fetchNews({
        lastDoc,
        updateFetchedNews,
        updateLastDoc,
        updateFetchedNewsError,
        updateIsFetching,
      });
    } else {
      fetchIDNews(extractedID);
    }
  }, [fetchedNews]);

  const fetchIDNews = (id: string | null) => {
    const filteredArray = fetchedNews?.filter((item: any) => item?.id == id);
    setCurrentNews({ ...filteredArray[0] });
  };

  return (
    <div className="newsPageWrapper">
      <Navbar newPage />
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
          {getRandomNews(fetchedNews, currentNews?.id)?.map(
            (news: any, i: any) => (
              <NewsPreview key={i} news={news} />
            )
          )}
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
      <Footer />
    </div>
  );
};

export default NewsPage;

const TextContent = ({ content }: any) => {
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
