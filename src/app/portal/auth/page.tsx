"use client";

import React, { useEffect, useRef, useState } from "react";
import "./auth.css";
import Image from "next/image";
import { StepOne, StepThree, StepTwo } from "@/components/signUpSteps";
import {
  nextProcess,
  prevProcess,
  setRef,
  uploadNewUser,
} from "@/utils/functions";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";

const stepDesc = [
  "Personal information",
  "Upload your picture",
  "Secure your account",
];

const AuthPage = () => {
  const [authLogin, setAuthLogin] = useState(true);
  const [signUpStep, setSignUpStep] = useState(1);
  const stepsRef = useRef([]);
  const authImgRef = useRef(null);
  const moveableWrapRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    handleAuthTypeTransition();
  }, [authLogin]);

  const handleAuthTypeTransition = () => {
    if (!authImgRef.current || !moveableWrapRef.current) return;

    if (!authLogin) {
      authImgRef.current.style.left = "100%";
      moveableWrapRef.current.style.left = "-100%";
    } else {
      authImgRef.current.style.left = "0";
      moveableWrapRef.current.style.left = "0";
    }
  };

  const createUser = () => {
    uploadNewUser();

    router.push('/portal/student')
  }

  return (
    <div className="authPage">
      <div className="leftAuthWrapper">
        <img
          ref={authImgRef}
          src="/auth_img.jpeg"
          alt="login image"
          className="authImage"
        />
      </div>
      <div className="rightAuthWrapper">
        <div ref={moveableWrapRef} className="moveableWrapper">
          {authLogin ? (
            <LoginComp setAuthLogin={setAuthLogin} 
            createUser={createUser} />
          ) : (
            <SignUpComp
              signUpStep={signUpStep}
              setSignUpStep={setSignUpStep}
              stepsRef={stepsRef}
              setAuthLogin={setAuthLogin}
              createUser={createUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;



const LoginComp = ({ setAuthLogin, createUser }: any) => {
  const [toggleShow, settoggleShow] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    createUser()
  };

  const gotoSignUp = () => {
    setAuthLogin(false);
  };

  return (
    <>
      <a href="/">
        <Image
          src={"/logo.png"}
          width={340}
          height={150}
          alt="tech-u logo"
          className="logo"
        />
      </a>
      <h2>Login to your account</h2>
      <div className="formBox">
        <form onSubmit={handleSubmit}>
          <div className="formInput">
            <input
              placeholder="Matric No./Reg No."
              required
              className="inputBox"
            />
          </div>
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
            <div className="authBtn alternate" onClick={gotoSignUp}>
              Sign Up
            </div>
            <button className="authBtn" type="submit">
              Log In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const SignUpComp = ({
  signUpStep,
  setSignUpStep,
  stepsRef,
  setAuthLogin,
  createUser
}: any) => {
  return (
    <>
      <a href="/">
        <Image
          src={"/logo.png"}
          width={340}
          height={150}
          alt="tech-u logo"
          className="logo"
        />
      </a>
      <h2>Create your account</h2>
      <div className="formBox">
        <p className="authStep">
          Step {signUpStep} of 3: {stepDesc[signUpStep - 1]}
        </p>
        <div ref={(el: any) => setRef(el, 0, stepsRef)} className="stepCont">
          <StepOne
            nextProcess={() => nextProcess(stepsRef, setSignUpStep)}
            setAuthLogin={setAuthLogin}
          />
        </div>
        <div ref={(el: any) => setRef(el, 1, stepsRef)} className="stepCont">
          <StepTwo
            nextProcess={() => nextProcess(stepsRef, setSignUpStep)}
            prevProcess={() => prevProcess(stepsRef, setSignUpStep)}
          />
        </div>
        <div ref={(el: any) => setRef(el, 2, stepsRef)} className="stepCont">
          <StepThree
            createUser={createUser}
            prevProcess={() => prevProcess(stepsRef, setSignUpStep)}
          />
        </div>
      </div>
    </>
  );
};
