"use client";

import React, { useRef, useState } from "react";
import "./auth.css";
import Image from "next/image";
import { StepOne, StepThree, StepTwo } from "@/components/signUpSteps";

const stepDesc = [
  "Personal information",
  "Upload your picture",
  "Secure your account",
];

const AuthPage = () => {
  const [signUpStep, setSignUpStep] = useState(1);
  const stepsRef = useRef([]);

  const setRef = (element: any, index: number) => {
    stepsRef.current[index] = element;
  };

  function handleTransition(prevStep: any, dir: any) {
    const stepsLen = stepsRef.current?.length;


    if (dir == "next") {
      if (prevStep == stepsLen) {
        createUser();
        return;
      }

      // scale down the prev step
      if(!stepsRef.current[prevStep]) return;
      stepsRef.current[prevStep].style.transform = "scale(0)";
      stepsRef.current[prevStep].style.opacity = "0";

      //slide in the next step
      
      if(!stepsRef.current[prevStep + 1]) return;

      stepsRef.current[prevStep + 1].style.opacity = "1";
      if(prevStep + 1 == 1) stepsRef.current[prevStep + 1].style.right = "0";
      if(prevStep + 1 == 2) stepsRef.current[prevStep + 1].style.left = "0";
    } 
    else {
      if (prevStep == 1) return;

      //slide out the prev step
      if(!stepsRef.current[prevStep - 1]) return;

      stepsRef.current[prevStep - 1].style.opacity = "0";
      if(prevStep == 2) stepsRef.current[prevStep - 1].style.right = "100%";
      if(prevStep == 3) stepsRef.current[prevStep - 1].style.left = "100%";

      // scale up the next step
      if(!stepsRef.current[prevStep - 2]) return;

      stepsRef.current[prevStep - 2].style.transform = "scale(1)";
      stepsRef.current[prevStep - 2].style.opacity = "1";
    }
  }

  const nextProcess = () => {
    const stepsLen = stepsRef.current?.length;
    setSignUpStep((prevStep): any => {
      handleTransition(prevStep - 1, "next");

      if (prevStep < stepsLen) return prevStep + 1;
      else return prevStep;
    });
  };

  const prevProcess = () => {
    setSignUpStep((prevStep): any => {
      handleTransition(prevStep, "prev");

      if (prevStep > 1) return prevStep - 1;
      else return prevStep;
    });
  };

  const createUser = () => {
    console.log("user created");
  };

  return (
    <div className="authPage">
      <div className="leftAuthWrapper">
        <img src="/auth_img.jpeg" alt="login image" className="authImage" />
      </div>
      <div className="rightAuthWrapper">
          <Image
            src={"/logo.png"}
            width={340}
            height={150}
            alt="tech-u logo"
            className="logo"
          />
          <h2>Create your Account</h2>
          <div className="formBox">
            <p className="authStep">
              Step {signUpStep} of 3: {stepDesc[signUpStep - 1]}
            </p>
            <div ref={(el: any) => setRef(el, 0)} className="stepCont">
              <StepOne nextProcess={nextProcess} />
            </div>
            <div ref={(el: any) => setRef(el, 1)} className="stepCont">
              <StepTwo nextProcess={nextProcess} prevProcess={prevProcess} />
            </div>
            <div ref={(el: any) => setRef(el, 2)} className="stepCont">
              <StepThree createUser={createUser} prevProcess={prevProcess} />
            </div>
          </div>
      </div>
    </div>
  );
};

export default AuthPage;

