import { hostelCardTypeProps } from '@/types/student';
import React from 'react'
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import { handleDownloadFile } from '@/utils/studentFunctions';




const HostelCard = ({ cardTitle, leftArrowClicked, cardText, downloadUrl, fileName }: hostelCardTypeProps) => {
    
    return (
      <div className="sPR_infoCardCont">
        <h3 className="cardTitle">{cardTitle}</h3>
        <div className="card_body">
          <p>{cardText}</p>
        </div>
        <div className="hostelBottom">
          {leftArrowClicked && (
            <div className="counterIcon" onClick={() => leftArrowClicked && leftArrowClicked("back")}>
              <ArrowLeftOutlinedIcon
                sx={{
                  color: "black",
                  cursor: "pointer",
                  fontSize: "134x",
                }}
              />
            </div>
          )}
          <div className="continueBtn" onClick={() => handleDownloadFile(downloadUrl, fileName)}>
            <p>Download</p>
          </div>
        </div>
      </div>
    );
  };

export default HostelCard