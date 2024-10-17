"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { StepOne, StepThree, StepTwo } from "@/components/signUpSteps";
import { nextProcess, prevProcess, setRef } from "@/utils/functions";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { loginData, signUpData } from "@/types/auth";
import { signIn, signUp } from "@/api";
import { registerStepDesc } from "@/utils/constant";
import { v4 as uuidv4 } from "uuid";

import { storage } from "../../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CircularProgress } from "@mui/material";

export const LoginComp = ({ setAuthLogin, router }: any) => {
  const [toggleShow, settoggleShow] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [islogging, setIslogging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIslogging(true);

    loginUser({
      matric: e.target[0].value,
      password: e.target[1].value,
    });
  };

  const loginUser = async (formData: loginData) => {
    const response = await signIn(formData);
    if (response?.status != 200) {
      setLoginError(response?.error);
      setIslogging(false);
      return;
    }

    // save user details
    // response?.user

    router.push("/portal/student");
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
              onFocus={() => setLoginError("")}
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
              onFocus={() => setLoginError("")}
            />
          </div>
          {loginError && <p className="selectFile">{loginError}</p>}
          <div className="formBtns">
            <div className="authBtn alternate" onClick={gotoSignUp}>
              Sign Up
            </div>
            <button className="authBtn" type="submit">
              {islogging ? (
                <>
                  <CircularProgress size="13px" className="circularProgress" />
                </>
              ) : (
                <p>Log In</p>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export const SignUpComp = ({
  signUpStep,
  setSignUpStep,
  stepsRef,
  setAuthLogin,
  router,
}: any) => {
  const [signUpInfo, setSignUpInfo] = useState({
    fullName: "",
    matric: "",
    email: "",
    programme: "",
    imageLink: "",
    password: "",
  });
  const [uploadImage, setUploadImage] = useState(null);
  const [registerError, setRegisterError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const createUser = async (formData: signUpData) => {
    setIsRegistering(true);
    uploadPic(formData);
  };

  const uploadPic = (formData: signUpData) => {
    if (!uploadImage) return;

    const storageRef = ref(storage, `studentPictures/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, uploadImage);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        //   console.error('Upload failed:', error);
        setRegisterError("Image upload failed - try again.");
        setIsRegistering(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            // console.log('File available at', downloadURL);
            uploadNewUser(downloadURL, formData);
          })
          .catch((error) => {
            // console.error('Failed to get download URL:', error);
            setRegisterError("Failed to get download URL - try again.");
            setIsRegistering(false);
          });
      }
    );
  };

  const uploadNewUser = async (userImage: string, formData: signUpData) => {
    const updatedSignUpInfo = {
      ...formData,
      imageLink: userImage,
    };
    //   console.log('updated; ', updatedSignUpInfo)
    const response: any = await signUp(updatedSignUpInfo);

    if (response?.status != 200) {
      setRegisterError(response?.error);
      setIsRegistering(false);
      return;
    }

    console.log("newUser: ", response);

    // save user details
    // response?.user

    setIsRegistering(false);

    router.push("/portal/student");
  };

  useEffect(() => {
    setRegisterError("");
  }, [signUpInfo]);

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
          Step {signUpStep} of 3: {registerStepDesc[signUpStep - 1]}
        </p>
        <div ref={(el: any) => setRef(el, 0, stepsRef)} className="stepCont">
          <StepOne
            nextProcess={() => nextProcess(stepsRef, setSignUpStep, createUser)}
            setAuthLogin={setAuthLogin}
            setSignUpInfo={setSignUpInfo}
          />
        </div>
        <div ref={(el: any) => setRef(el, 1, stepsRef)} className="stepCont">
          <StepTwo
            nextProcess={() => nextProcess(stepsRef, setSignUpStep, createUser)}
            prevProcess={() => prevProcess(stepsRef, setSignUpStep, createUser)}
            setUploadImage={setUploadImage}
          />
        </div>
        <div ref={(el: any) => setRef(el, 2, stepsRef)} className="stepCont">
          <StepThree
            createUser={createUser}
            prevProcess={() => prevProcess(stepsRef, setSignUpStep, createUser)}
            signUpInfo={signUpInfo}
            setSignUpInfo={setSignUpInfo}
            isRegistering={isRegistering}
          />
          {registerError && (
            <p className="selectFile stepThree">{registerError}</p>
          )}
        </div>
      </div>
    </>
  );
};



// matric: 1125/23/1/014
// pass: Hunteraurum304


// add forgot password