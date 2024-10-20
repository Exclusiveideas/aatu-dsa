"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { StepOne, StepThree, StepTwo } from "@/components/signUpSteps";
import { nextProcess, prevProcess, setRef, validateAllInfo } from "@/utils/authFunctions";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { loginData, signUpData } from "@/types/auth";
import { signIn, signUp } from "@/api";
import { registerStepDesc } from "@/utils/constant";
import { v4 as uuidv4 } from "uuid";

import { storage } from "../../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CircularProgress } from "@mui/material";
import useAuthStore from "@/store/authStore";




export const LoginComp = ({ setAuthLogin, router, setSnackbarOpen }: any) => {
  const [toggleShow, settoggleShow] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [islogging, setIslogging] = useState(false);


  // global state
  const updateIsAuthenticated = useAuthStore((state) => state.updateIsAuthenticated);
  const updateStudent = useAuthStore((state) => state.updateStudent);
  const updateToken = useAuthStore((state) => state.updateToken);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIslogging(true);

    loginUser({
      matric: e.target[0].value,
      password: e.target[1].value,
    });
  };

  const loginUser = async (formData: loginData) => {
    const response: any  = await signIn(formData);

    if (response?.status != 200) {
      setLoginError(response?.error);
      setIslogging(false);
      return;
    }
    const fetchedStudent = response?.user.data


    // save user details
    updateIsAuthenticated(true);
    updateStudent(fetchedStudent?.result);
    updateToken(fetchedStudent?.token);
    

    setIslogging(false);
    setSnackbarOpen(true);

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
          priority={true}
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
  setSnackbarOpen
}: any) => {
  const [signUpInfo, setSignUpInfo] = useState({
    fullName: "",
    matric: "",
    email: "",
    faculty: "",
    programme: "",
    imageLink: "",
    level: '',
    gender: "",
    password: "",
  });
  const [uploadImage, setUploadImage] = useState(null);
  const [registerError, setRegisterError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  
  // global state
  const updateIsAuthenticated = useAuthStore((state) => state.updateIsAuthenticated);
  const updateStudent = useAuthStore((state) => state.updateStudent);
  const updateToken = useAuthStore((state) => state.updateToken);

  const createUser = async (formData: signUpData) => {
    setIsRegistering(true);

    // one last form validation
    const finalValidation = validateAllInfo(formData, setRegisterError);
    if(!finalValidation) return false;

    uploadPic(formData);
  };

  const uploadPic = (formData: signUpData) => {
    if (!uploadImage) {
      setIsRegistering(false);
      return;
    }

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
            uploadNewUser(downloadURL, formData);
          })
          .catch((error) => {
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
    const response: any = await signUp(updatedSignUpInfo);

    if (response?.status != 200) {
      setRegisterError(response?.error);
      setIsRegistering(false);
      return;
    }

    const createdStudent = response?.user.data

    // save user details
    updateIsAuthenticated(true);
    updateStudent(createdStudent?.result);
    updateToken(createdStudent?.token);


    setIsRegistering(false);
    setSnackbarOpen(true);

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
          priority={true}
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