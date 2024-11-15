import { useEffect, useRef } from "react";

import "./newsGrid.css";
import { createSkewAnimation } from "@/utils/hooks/newsGridFunctions";
import { Skeleton } from "@mui/material";

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
            {availableNews?.map((_, i) => (
              <figure key={i} className="grid__item">
                <div className="grid__item-imgwrap">
                  <div
                    className="grid__item-img"
                    style={{ backgroundImage: `url(${"/imgs/welcome.jpeg"})` }}
                  ></div>
                </div>
              </figure>
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
