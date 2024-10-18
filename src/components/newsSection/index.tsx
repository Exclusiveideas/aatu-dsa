"use client";

import React from "react";
import "./newsSection.css";
import { useRouter } from "next/navigation";
import NewsPreview from "../newsPreview";

const NewsSection = () => {
  const router = useRouter();

  const gotoAllNews = () => {
    router.push("/all-news");
  };

  return (
    <div className="newsSection">
      <div className="newsSectHeader">
        <div className="headerText">
          <h2>News & Updates</h2>
        </div>
        <div className="moreNewsTxt" onClick={gotoAllNews}>
          <p>More News</p>
        </div>
      </div>
      <div className="newPreviews">
        <div className="newsTopPriority">
          <NewsPreview topP firstTopP />
          <NewsPreview topP />
        </div>
        <div className="newslesserPriority">
          <NewsPreview />
          <NewsPreview />
          <NewsPreview />
          <NewsPreview />
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
