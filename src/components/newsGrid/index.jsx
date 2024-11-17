import { useEffect, useRef } from "react";

import "./newsGrid.css";
import { createSkewAnimation } from "@/utils/hooks/newsGridFunctions";
import { Skeleton } from "@mui/material";
import { truncateString } from "@/utils/newsFunctions";
import { useRouter } from "next/navigation";

const NewsGrid = ({ availableNews, contentRefDistance }) => {
  const contentRef = useRef();
  const newsMaskingContRef = useRef();
  const gridBoxRef = useRef();

  useEffect(() => {
    if (!gridBoxRef.current) return;

    createSkewAnimation(gridBoxRef.current);
  }, [gridBoxRef.current, availableNews]);

  useEffect(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;
    const dist = content?.clientHeight;

    contentRefDistance.current = dist;
  }, [contentRef.current]);

  return (
    <div ref={newsMaskingContRef} className="masking-container">
      <div ref={contentRef}>
        {availableNews[0] ? (
          <div ref={gridBoxRef} className="grid">
            {availableNews?.map((news, i) => (
              <NewsPreview key={i} news={news} />
            ))}
          </div>
        ) : (
          <div ref={gridBoxRef} className="grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                animation="wave"
                className="grid__item"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsGrid;


export const NewsPreview = ({ news }) => {
  const router = useRouter();

  const handleNewsClick = () => {
    if(news?.id) router.push(`/news?newsID=${news?.id}`);
  };

  return (
    <figure
      onClick={handleNewsClick}
      className="grid__item"
    >
      <div className="grid__item-imgwrap">
        <div className="grid__item_info_box">
          <h3 className="grid_info_box_title">{news?.title?.stringValue}</h3>
          <p className="grid_info_box_messsage">
            {truncateString(news?.message?.stringValue ?? "")}
          </p>
        </div>
        <div
          style={{ backgroundImage: `url(${"/imgs/welcome.jpeg"})` }}
          className="grid__item_bg"
        ></div>
        <div className="dark_overlay"></div>
      </div>
    </figure>
  );
};
