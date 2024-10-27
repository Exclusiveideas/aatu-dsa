import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import { handleDownloadFile } from '@/utils/studentFunctions';
import { useState } from "react";
import { CircularProgress } from "@mui/material";




const HostelCard = ({ cardTitle, leftArrowClicked, cardText, downloadUrl, fileName }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = () => {
    setIsDownloading(true)
    handleDownloadFile(downloadUrl, fileName, setIsDownloading)
  }
    
    return (
      <div className="sPR_infoCardCont">
        <h3 className="cardTitle">{cardTitle}</h3>
        <div className="card_body">
          <p>{cardText}</p>
        </div>
        <div className="hostelBottom">
          {leftArrowClicked && (
            <div
              className="counterIcon"
              onClick={() => leftArrowClicked && leftArrowClicked("back")}
            >
              <ArrowLeftOutlinedIcon
                sx={{
                  color: "black",
                  cursor: "pointer",
                  fontSize: "134x",
                }}
              />
            </div>
          )}
          <div
            className="continueBtn"
            onClick={downloadFile}
          >
            {isDownloading ? (
              <CircularProgress size="13px" className="circularProgress" />
            ) : (
              <p>Download</p>
            )}
          </div>
        </div>
      </div>
    );
  };

export default HostelCard