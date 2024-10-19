import React from "react";
import "./sPortal.css";

const midSectInfo = [
  {
    textOne: "Academic Session: 2024/2025",
    textTwo: "Semester: 1st",
  },
  {
    textOne: "Architectural Science",
    textTwo: "125/23/11/9393.",
  },
  {
    textOne: "Academic Session: 2024/2025",
    textTwo: "Semester: 1st",
  },
];

const HomeComp = () => {
  const user = {
    fullName: "Sanusi Adebayo",
  };

  return (
    <div className="sPortalHome">
      <div className="bodySection">
        <div className="bodySection_Top">
          <h2 className="welcomeTxt">Welcome back {user?.fullName}</h2>
          <p className="subNote">
            School resumes on the 20th of November, 2024
          </p>
        </div>
        <div className="bodySection_Mid">
          {midSectInfo?.map((sectInfo, i) => (
            <div key={i} className="sectInfoWrapper">
              <p>{sectInfo.textOne}</p>
              <p>{sectInfo.textTwo}</p>
            </div>
          ))}
        </div>
        <div className="bodySection_Bottom">
          <div className="sectInfoWrapper bottomSect">
            <p className="title">Important things to note before resuming</p>
            <ul className="description">
              <li>
                Print out your hostel info and give it to your respective hostel
              </li>
              <li>
                portal to sign Read and Abide to the Hostel Rules and
                regulations, all violators shall be punished
              </li>
              <li>Register for OYSHIA if you haven’t</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComp;
