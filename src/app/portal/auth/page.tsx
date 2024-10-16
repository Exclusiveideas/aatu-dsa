"use client";

import React, { useEffect, useRef, useState } from "react";
import "./auth.css";
import Image from "next/image";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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

    // console.log('stepsref: ', stepsRef.current)

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

const StepOne = ({ nextProcess }: any) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    nextProcess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formInput">
        <input placeholder="Full Name" required className="inputBox" />
      </div>
      <div className="formInput">
        <input placeholder="Matric No./Reg No." required className="inputBox" />
      </div>
      <div className="formInput">
        <input
          placeholder="School email/Personal email"
          required
          className="inputBox"
        />
      </div>
      <div className="formInput">
        <input placeholder="Programme" required className="inputBox" />
      </div>
      <button className="authBtn" type="submit">
        Continue
      </button>
    </form>
  );
};

const StepTwo = ({ nextProcess, prevProcess }: any) => {
  const [file, setFile]: any = useState(null);
  const [noSelected, setNoSelected]: any = useState(false);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleContinue = () => {
    if (!file) {
      setNoSelected(true);
      return;
    }

    setNoSelected(false);
    nextProcess();
  };

  useEffect(() => {
    if (file) setNoSelected(false);
  }, [file]);

  const goBack = () => {
    console.log('bacl')
    prevProcess()
  }

  return (
    <div className="stepTwo">
      <input
        type="file"
        id="file"
        accept="image/*"
        className="file-input"
        onChange={handleFileChange}
      />
      <label htmlFor="file" className="addImgCirc">
        <div className="pulsatingBox"></div>
        <div className="pulsatingBox"></div>
        <PersonAddAlt1Icon
          sx={{
            color: "white",
            cursor: "pointer",
            fontSize: "250%",
          }}
        />
      </label>
      {!file ? (
        <p className="tapTxt">Click to upload your picture</p>
      ) : (
        <p className="tapTxt">Selected file: {file?.name}</p>
      )}
      {noSelected && (
        <p className="selectFile">Please upload your picture to continue</p>
      )}
      <div className="formBtns">
        <div className="authBtn alternate" onClick={goBack}>
          Go Back
        </div>
        <div className="authBtn" onClick={handleContinue}>
          Continue
        </div>
      </div>
    </div>
  );
};

const StepThree = ({ createUser, prevProcess }: any) => {
  const [toggleShow, settoggleShow] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createUser();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formInput thirdFormInput">
        <div
          className="visibilityCont"
          onClick={() => settoggleShow((prev) => !prev)}
        >
          {!toggleShow ? (
            <RemoveRedEyeIcon
              sx={{
                color: "black",
                cursor: "pointer",
                fontSize: "20px",
              }}
            />
          ) : (
            <VisibilityOffIcon
              sx={{
                color: "black",
                cursor: "pointer",
                fontSize: "20px",
              }}
            />
          )}
        </div>
        <input
          placeholder="Password"
          type={toggleShow ? "text" : "password"}
          required
          className="inputBox"
        />
      </div>
      <div className="formBtns">
        <div className="authBtn alternate" onClick={prevProcess}>
          Go Back
        </div>
        <button className="authBtn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
