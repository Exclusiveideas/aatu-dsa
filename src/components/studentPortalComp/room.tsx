"use client";

import React, { useEffect, useState } from "react";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { Checkbox } from "@mui/material";

const cardInfos = [
  [
    "As a resident, you are responsible for the proper care and maintenance of your assigned room and any common areas you use.",
    "Intentional damage to hostel property, furniture, or fixtures will not be tolerated and may result in disciplinary action or eviction.",
  ],
  [
    "You are responsible for the security of your personal belongings. The university recommends you secure valuable items or store them in lockers provided.",
    "Room keys are to be kept safe. A replacement fee will be charged for lost keys.",
  ],
  [
    "For safety and hygiene reasons, cooking is strictly prohibited in all rooms and common areas of the hostel.",
    "Residents are not allowed to bring or use personal cooking equipment such as hot plates, gas stoves, microwaves, or electric kettles in their rooms.",
  ],
  [
    "I accept to follow all hostel rules and regulations, respect the hostel community, and cooperate with management. I understand that breaking these rules may result in disciplinary actions, including fines or other penalties as decided by the DSA.",
  ],
];

const RoomComp = () => {
  const [alertCounter, setAlertCounter] = useState(1);

  const changeCounter = (dir: string) => {
    if (dir == "next") {
      setAlertCounter((prevCount: any) =>
        prevCount < 5 ? prevCount + 1 : prevCount
      );
    } else {
      setAlertCounter((prevCount: any) =>
        prevCount > 1 ? prevCount - 1 : prevCount
      );
    }
  };

  return (
    <div className="sPortalRoom">
      <div className="sPR_InfoWrapper">
        {alertCounter < 5 ? (
          <InfoCard
            cardInfos={cardInfos}
            alertCounter={alertCounter}
            changeCounter={changeCounter}
          />
        ) : (
          <HostelCard changeCounter={changeCounter} />
        )}
      </div>
    </div>
  );
};

export default RoomComp;

const InfoCard = ({ cardInfos, alertCounter, changeCounter }: any) => {
  const [checked, setChecked] = useState(false);

  const completeAlerts = () => {
    if (!checked) return;
    changeCounter("next");
  };

  return (
    <div className="sPR_infoCardCont">
      <h3 className="cardTitle">Important Info</h3>
      <div className="card_body">
        {alertCounter < 4 ? (
          <ul>
            {cardInfos[alertCounter - 1]?.map((cardInfo: any, i: any) => (
              <li key={i}>{cardInfo}</li>
            ))}
          </ul>
        ) : (
          <div className="checkBoxCont">
            <Checkbox
              checked={checked}
              onChange={() => setChecked((prevVal) => !prevVal)}
            />
            <p>
              {cardInfos[3]?.map((cardInfo: any, i: any) => (
                <span key={i}>{cardInfo}</span>
              ))}
            </p>
          </div>
        )}
      </div>
      <div className="cardBottom">
        <div className="directionDiv">
          <div className="counterIcon" onClick={() => changeCounter("back")}>
            <ArrowLeftOutlinedIcon
              sx={{
                color: "black",
                cursor: "pointer",
                fontSize: "134x",
              }}
            />
          </div>
        </div>
        <div className="counterDiv">
          <p>{alertCounter} of 4</p>
        </div>
        <div className="directionDiv">
          {alertCounter < 4 ? (
            <div className="counterIcon" onClick={() => changeCounter("next")}>
              <ArrowRightOutlinedIcon
                sx={{
                  color: "black",
                  cursor: "pointer",
                  fontSize: "134x",
                }}
              />
            </div>
          ) : (
            <div className="continueBtn" onClick={completeAlerts}>
              <p>Continue</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HostelCard = ({ changeCounter }: any) => {
  const assignedRoom = "El-salem, Block C upper bunkA";

  const downloadAssignedRoom = () => {};

  return (
    <div className="sPR_infoCardCont">
      <h3 className="cardTitle">Important Info</h3>
      <div className="card_body">
        <p>You’ve been allocated to {assignedRoom}.</p>
      </div>
      <div className="hostelBottom">
        <div className="counterIcon" onClick={() => changeCounter("back")}>
          <ArrowLeftOutlinedIcon
            sx={{
              color: "black",
              cursor: "pointer",
              fontSize: "134x",
            }}
          />
        </div>
        <div className="continueBtn" onClick={downloadAssignedRoom}>
          <p>Download</p>
        </div>
      </div>
    </div>
  );
};
