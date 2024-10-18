"use client";

import React, { useEffect, useState } from "react";
import "./singleNewsPage.css";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import HistoryIcon from "@mui/icons-material/History";
import NewsPreview from "@/components/newsPreview";

const sampleItems = [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
  "Item 6",
  "Item 7",
  "Item 8",
  "Item 9",
  "Item 10",
];

const NewsPage = () => {
  const searchParams = useSearchParams();
  const newsID = searchParams.get("newsID");

  const [newsId, setNewsId] = useState<any>("");

  let newsBgImg = "/welcome.jpeg";

  let headerTxt = "Hostel Orientation for New Students";
  let createdOn = "1 Oct 2024";
  let newsBody = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    
    Quam sapiente animi libero ipsam. Deleniti est voluptates debitis rerum consequatur vitae veniam molestias fugiat vero ad suscipit dolor, 
    ipsam culpa dolorum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia delectus est officiis accusamus eius, 
    architecto quidem laudantium iure ratione! Minus veritatis fuga, consectetur officiis quasi quae fugiat tempore explicabo hic! Lorem, 
    ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita in fugit fugiat accusantium. Molestias quis aperiam dolores temporibus 
    error eum quos, voluptate magnam, expedita illo ducimus, voluptatem dolor dolore.

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sapiente animi libero ipsam. Deleniti est voluptates debitis rerum consequatur vitae veniam molestias fugiat vero ad suscipit dolor, ipsam culpa dolorum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia delectus est officiis accusamus eius, architecto quidem laudantium iure ratione! Minus veritatis fuga, consectetur officiis quasi quae fugiat tempore explicabo hic! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita in fugit fugiat accusantium. Molestias quis aperiam dolores temporibus error eum quos, voluptate magnam, expedita illo ducimus, voluptatem dolor dolore.
\n
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sapiente animi libero ipsam. Deleniti est voluptates debitis rerum consequatur vitae veniam molestias fugiat vero ad suscipit dolor, ipsam culpa dolorum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia delectus est officiis accusamus eius, architecto quidem laudantium iure ratione! Minus veritatis fuga, consectetur officiis quasi quae fugiat tempore explicabo hic! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita in fugit fugiat accusantium. Molestias quis aperiam dolores temporibus error eum quos, voluptate magnam, expedita illo ducimus, voluptatem dolor dolore.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sapiente animi libero ipsam. Deleniti est voluptates debitis rerum consequatur vitae veniam molestias fugiat vero ad suscipit dolor, ipsam culpa dolorum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia delectus est officiis accusamus eius, architecto quidem laudantium iure ratione! Minus veritatis fuga, consectetur officiis quasi quae fugiat tempore explicabo hic! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita in fugit fugiat accusantium. Molestias quis aperiam dolores temporibus error eum quos, voluptate magnam, expedita illo ducimus, voluptatem dolor dolore.
\n
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sapiente animi libero ipsam. Deleniti est voluptates debitis rerum consequatur vitae veniam molestias fugiat vero ad suscipit dolor, ipsam culpa dolorum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia delectus est officiis accusamus eius, architecto quidem laudantium iure ratione! Minus veritatis fuga, consectetur officiis quasi quae fugiat tempore explicabo hic! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita in fugit fugiat accusantium. Molestias quis aperiam dolores temporibus error eum quos, voluptate magnam, expedita illo ducimus, voluptatem dolor dolore.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sapiente animi libero ipsam. Deleniti est voluptates debitis rerum consequatur vitae veniam molestias fugiat vero ad suscipit dolor, ipsam culpa dolorum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia delectus est officiis accusamus eius, architecto quidem laudantium iure ratione! Minus veritatis fuga, consectetur officiis quasi quae fugiat tempore explicabo hic! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita in fugit fugiat accusantium. Molestias quis aperiam dolores temporibus error eum quos, voluptate magnam, expedita illo ducimus, voluptatem dolor dolore.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sapiente animi libero ipsam. Deleniti est voluptates debitis rerum consequatur vitae veniam molestias fugiat vero ad suscipit dolor, ipsam culpa dolorum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia delectus est officiis accusamus eius, architecto quidem laudantium iure ratione! Minus veritatis fuga, consectetur officiis quasi quae fugiat tempore explicabo hic! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita in fugit fugiat accusantium. Molestias quis aperiam dolores temporibus error eum quos, voluptate magnam, expedita illo ducimus, voluptatem dolor dolore.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sapiente animi libero ipsam. Deleniti est voluptates debitis rerum consequatur vitae veniam molestias fugiat vero ad suscipit dolor, ipsam culpa dolorum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia delectus est officiis accusamus eius, architecto quidem laudantium iure ratione! Minus veritatis fuga, consectetur officiis quasi quae fugiat tempore explicabo hic! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita in fugit fugiat accusantium. Molestias quis aperiam dolores temporibus error eum quos, voluptate magnam, expedita illo ducimus, voluptatem dolor dolore.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sapiente animi libero ipsam. Deleniti est voluptates debitis rerum consequatur vitae veniam molestias fugiat vero ad suscipit dolor, ipsam culpa dolorum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia delectus est officiis accusamus eius, architecto quidem laudantium iure ratione! Minus veritatis fuga, consectetur officiis quasi quae fugiat tempore explicabo hic! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita in fugit fugiat accusantium. Molestias quis aperiam dolores temporibus error eum quos, voluptate magnam, expedita illo ducimus, voluptatem dolor dolore.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sapiente animi libero ipsam. Deleniti est voluptates debitis rerum consequatur vitae veniam molestias fugiat vero ad suscipit dolor, ipsam culpa dolorum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia delectus est officiis accusamus eius, architecto quidem laudantium iure ratione! Minus veritatis fuga, consectetur officiis quasi quae fugiat tempore explicabo hic! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita in fugit fugiat accusantium. Molestias quis aperiam dolores temporibus error eum quos, voluptate magnam, expedita illo ducimus, voluptatem dolor dolore.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sapiente animi libero ipsam. Deleniti est voluptates debitis rerum consequatur vitae veniam molestias fugiat vero ad suscipit dolor, ipsam culpa dolorum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia delectus est officiis accusamus eius, architecto quidem laudantium iure ratione! Minus veritatis fuga, consectetur officiis quasi quae fugiat tempore explicabo hic! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita in fugit fugiat accusantium. Molestias quis aperiam dolores temporibus error eum quos, voluptate magnam, expedita illo ducimus, voluptatem dolor dolore.
\n
    `;

  useEffect(() => {
    if (newsID) {
      setNewsId(newsID);
    } else {
      setNewsId(null);
    }
  }, [newsID]);

  function getRandomItems(array: any, excludedElement: any) {
    // Filter out the excluded element
    const filteredArray = array.filter((item: any) => item !== excludedElement);

    // Ensure the filtered array has at least 3 items
    if (filteredArray.length < 4) {
      return filteredArray;
    }

    const result = [];
    const indices = new Set(); // To store unique indices

    while (result.length < 4) {
      const randomIndex = Math.floor(Math.random() * filteredArray.length);

      // Check if this index has already been chosen
      if (!indices.has(randomIndex)) {
        indices.add(randomIndex); // Add to the set of indices
        result.push(filteredArray[randomIndex]); // Add the item to the result
      }
    }

    return result;
  }

  return (
    <div className="newsPageWrapper">
      <Navbar newPage />
      <div className="headerSection">
        <div className="imgContainer">
          <div className="blackOverlay"></div>
          <img src={newsBgImg} alt="news image" />
        </div>

        <div className="infoWrapper">
          <h4 className="headerTxt">{headerTxt}</h4>
          <div className="postedTime">
            <HistoryIcon
              sx={{
                color: "white",
                cursor: "pointer",
                fontSize: "18px",
              }}
            />
            <p>{createdOn}</p>
          </div>
        </div>
      </div>
      <div className="newsBodySection">
        <div className="newsBody">
          <TextContent content={newsBody} />
        </div>
      </div>
      <div className="moreNewsSection">
        {getRandomItems(sampleItems, "Item 1").map((newsInfo: any, i: any) => (
          <>
            <NewsPreview />
          </>
        ))}
      </div>
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
