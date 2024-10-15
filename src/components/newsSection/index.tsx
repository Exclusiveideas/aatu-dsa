import React from "react";
import "./newsSection.css";
import HistoryIcon from "@mui/icons-material/History";

const NewsSection = () => {
  return (
    <div className="newsSection">
      <div className="newsSectHeader">
        <div className="headerText">
          <h2>News & Updates</h2>
        </div>
        <div className="moreNewsTxt">
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

const NewsPreview = ({ topP, firstTopP }: any) => {
  let headerTxt = "Hostel Orientation for New Students";
  let shortDesc =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dolorum aperiam vitae accusantium nam quaerat officiis nobis doloribus tempora cum in, praesentium, impedit ea beatae rem, magnam eveniet ducimus ipsum.";
  let createdOn = "1 Oct 2024";

  let maxLen = topP ? 120 : 60;
  let newsBgImg = '/welcome.jpeg'

  return (
    <div
      className="newsPreview"
      style={{ flex: topP ? (firstTopP ? ".6" : ".4") : "1", paddingBottom: topP ? '3rem' : '1.5rem' }}
    >
      <div className="bgImageCont">
        <div className="blackOverlay"></div>
        <img src={newsBgImg} alt="news image" />
      </div>
      <div className="infoWrapper" style={{ gap: topP ? '.5rem' : '.2rem'}}>
        <h4 style={{ fontSize: topP ? '1.7rem': '1.2rem'}}>{headerTxt}</h4>
        <p style={{ fontSize: topP ? '13px': '11px', lineHeight: topP ? '22px' : '18px' }} className="shortDesc">{shortDesc.slice(0, maxLen - 3) + "..."}</p>
        <div style={{ fontSize: topP ? '12px': '10px', padding: topP ? '.7rem 1.5rem' : '.5rem 1.2rem', marginTop: topP ? '1rem' : '.3rem'}} className="readMoreBtn">
          <div className="pulsatingBox readMore"></div>
          Read More
        </div>
        <div style={{ fontSize: topP ? '11px': '9px'}} className="postedTime">
          <HistoryIcon
            sx={{
              color: "white",
              cursor: "pointer",
              fontSize: "13px",
            }}
          />
          <p>{createdOn}</p>
        </div>
      </div>
    </div>
  );
};
