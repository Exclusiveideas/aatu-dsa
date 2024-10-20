import HistoryIcon from "@mui/icons-material/History";
import "../newsSection/newsSection.css";
import { useRouter } from "next/navigation";
 
const NewsPreview = ({ topP, firstTopP, allNewsPage, news }: any) => {
  const router = useRouter();

  let maxLen = topP ? 120 : 60;
  let newsBgImg = "/welcome.jpeg";

  const gotoSingleNewsPage = () => {
    if(news?.id) router.push(`/all-news/news?newsID=${news?.id}`);
  };

  return (
    <div
      className="newsPreview"
      style={{
        flex: topP ? (firstTopP ? ".6" : ".4") : "1",
        paddingBottom: topP ? "3rem" : "1.5rem",
        minHeight: allNewsPage && "350px",
      }}
    > 
      <div className="bgImageCont">
        <div className="blackOverlay"></div>
        <img src={newsBgImg} alt="news image" />
      </div>
      <div className="infoWrapper" style={{ gap: topP ? ".5rem" : ".2rem" }}>
        <h4 style={{ fontSize: topP ? (firstTopP ?  "3.2rem" : "2.7rem") : "2.1rem" }}>{news?.title.stringValue || "No Title"}</h4>
        <p
          style={{
            fontSize: topP ? "13px" : "11px",
            lineHeight: topP ? "22px" : "18px",
          }}
          className="shortDesc"
        >
          {news?.message?.stringValue? (news?.message?.stringValue)?.slice(0, maxLen - 3) + "..." : "Now preview description for this news"}
        </p>
        <div
          style={{
            fontSize: topP ? "12px" : "10px",
            padding: topP ? ".7rem 1.5rem" : ".5rem 1.2rem",
            marginTop: topP ? "1rem" : ".3rem",
          }}
          className="readMoreBtn"
          onClick={gotoSingleNewsPage}
        >
          <div className="pulsatingBox readMore"></div>
          Read More
        </div>
        <div style={{ fontSize: topP ? "11px" : "9px" }} className="postedTime">
          <HistoryIcon
            sx={{
              color: "white",
              cursor: "pointer",
              fontSize: "13px",
            }}
          />
          <p>{news?.createdOn || "No timestamp"}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsPreview;
