"use client";

import React from "react";
import "./sPortal.css";
import { Skeleton } from "@mui/material";
import useAuthStore from "@/store/authStore";


const HomeComp = () => {
  const studentInfo = useAuthStore((state) => state.student);

const midSectInfo = [
  {
    textOne: "Academic Session: 2024/2025",
    textTwo: "Semester: 1st",
  },
  {
    textOne: `Level: ${studentInfo?.level}`,
    textTwo: `Matric: ${studentInfo?.matric}`,
  },
  {
    textOne: `Faculty: ${studentInfo?.faculty}`,
    textTwo: `Programme: ${studentInfo?.programme}`,
  },
];

  return (
    <div className="sPortalHome">
      {studentInfo ? (
        <div className="bodySection">
          <div className="bodySection_Top">
            <h2 className="welcomeTxt">Welcome back {studentInfo?.fullName}</h2>
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
                  Print out your hostel information and give it to your respective hostel porter
                </li>
                <li>
                  Read and Abide to the Hostel Rules and regulations. All violators shall be punished
                </li>
                <li>Register for OYSHIA if you haven’t</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="skeletonCont">
          <Skeleton variant="rounded" animation="wave" width={"100%"} height={"30%"} />
          <div className="midSkeleton">
            <Skeleton variant="rounded" animation="wave" width={"30%"} height={"100%"} />
            <Skeleton variant="rounded" animation="wave" width={"30%"} height={"100%"} />
            <Skeleton variant="rounded" animation="wave" width={"30%"} height={"100%"} />
          </div>
          <Skeleton variant="rounded" animation="wave" width={"100%"} height={"35%"} />
        </div>
      )}
    </div>
  );
};

export default HomeComp;
