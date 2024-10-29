"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import {
  nextProcess,
  prevProcess,
  setRef,
  validateAllInfo,
} from "@/utils/authFunctions";
import { signUp } from "@/api";
import { registerStepDesc } from "@/utils/constant";
import { v4 as uuidv4 } from "uuid";

import { storage } from "../../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import useAuthStore from "@/store/authStore";
import StepThree from "../signUpSteps/stepThree";
import StepTwo from "../signUpSteps/stepTwo";
import StepOne from "../signUpSteps/stepOne";

const SignUpComp = ({
  signUpStep,
  setSignUpStep,
  setAuthLogin,
  router,
  openSnackBar,
}) => {
  const [signUpInfo, setSignUpInfo] = useState({
    fullName: "",
    matric: "",
    email: "",
    faculty: "",
    programme: "",
    imageLink: "",
    level: "",
    gender: "",
    password: "",
  });
  const [uploadImage, setUploadImage] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  // global state
  const updateIsAuthenticated = useAuthStore(
    (state) => state.updateIsAuthenticated
  );
  const updateStudent = useAuthStore((state) => state.updateStudent);
  const updateToken = useAuthStore((state) => state.updateToken);

  const stepsRef = useRef([]);

  const createUser = async (formData) => {
    setIsRegistering(true);

    // one last form validation
    const finalValidation = validateAllInfo(formData, setFinalValidationError);
    if (!finalValidation) return false;

    uploadPic(formData);
  };

  const setFinalValidationError = (errorMssg) => {
    openSnackBar(errorMssg, "error");
  };

  const uploadPic = (formData) => {
    if (!uploadImage) {
      setIsRegistering(false);
      return;
    }

    openSnackBar("Uploading your profile picture...", "success");

    const storageRef = ref(storage, `studentPictures/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, uploadImage);

    uploadTask.on(
      "state_changed",
      null,
      () => {
        openSnackBar("Image upload failed - try again.", "error");
        setIsRegistering(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            uploadNewUser(downloadURL, formData);
          })
          .catch(() => {
            openSnackBar("Failed to get download URL - try again.", "error");
            setIsRegistering(false);
          });
      }
    );
  };

  const uploadNewUser = async (userImage, formData) => {
    openSnackBar("Setting up your student account", "success");
    setTimeout(() => {
      if (isRegistering) openSnackBar("Almost complete", "success");
    }, 7000);

    const updatedSignUpInfo = {
      ...formData,
      imageLink: userImage,
    };
    const response = await signUp(updatedSignUpInfo);

    if (response?.status != 200) {
      openSnackBar(response?.error, "error");
      setIsRegistering(false);
      return;
    }

    const createdStudent = response?.user.data;

    // save user details
    updateIsAuthenticated(true);
    updateStudent(createdStudent?.result);
    updateToken(createdStudent?.token);

    openSnackBar("Your account is fully set up - routing you now", "success");

    setIsRegistering(false);

    setTimeout(() => router.push("/portal/student"), 1500);
  };

  useEffect(() => {
    // clears the message when unmounting
    return () => {
      openSnackBar("", "success");
    };
  }, []);

  return (
    <div className="signUpcomp">
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
        <div ref={(el) => setRef(el, 0, stepsRef)} className="stepCont">
          <StepOne
            nextProcess={() => nextProcess(stepsRef, setSignUpStep, createUser)}
            setAuthLogin={setAuthLogin}
            setSignUpInfo={setSignUpInfo}
          />
        </div>
        <div ref={(el) => setRef(el, 1, stepsRef)} className="stepCont">
          <StepTwo
            nextProcess={() => nextProcess(stepsRef, setSignUpStep, createUser)}
            prevProcess={() => prevProcess(stepsRef, setSignUpStep, createUser)}
            setUploadImage={setUploadImage}
          />
        </div>
        <div ref={(el) => setRef(el, 2, stepsRef)} className="stepCont">
          <StepThree
            createUser={createUser}
            prevProcess={() => prevProcess(stepsRef, setSignUpStep, createUser)}
            signUpInfo={signUpInfo}
            setSignUpInfo={setSignUpInfo}
            isRegistering={isRegistering}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpComp;
