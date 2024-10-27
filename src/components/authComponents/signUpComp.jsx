"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { nextProcess, prevProcess, setRef, validateAllInfo } from "@/utils/authFunctions";
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
    setSnackbarOpen
  }) => {
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
    const [signupFeedback, setSignupFeedback] = useState('');
  
    
    // global state
    const updateIsAuthenticated = useAuthStore((state) => state.updateIsAuthenticated);
    const updateStudent = useAuthStore((state) => state.updateStudent);
    const updateToken = useAuthStore((state) => state.updateToken);
  
    const stepsRef = useRef([]);
  
  
    const createUser = async (formData) => {
      setIsRegistering(true);
  
      // one last form validation
      const finalValidation = validateAllInfo(formData, setRegisterError);
      if(!finalValidation) return false;
  
      uploadPic(formData);
    };
  
    const uploadPic = (formData) => {
      if (!uploadImage) {
        setIsRegistering(false);
        return;
      }

      setSignupFeedback('Uploading your profile picture...');
  
      const storageRef = ref(storage, `studentPictures/${uuidv4()}`);
      const uploadTask = uploadBytesResumable(storageRef, uploadImage);
  
      uploadTask.on(
        "state_changed",
        null,
        () => {
          setRegisterError("Image upload failed - try again.");
          setIsRegistering(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              uploadNewUser(downloadURL, formData);
            })
            .catch(() => {
              setRegisterError("Failed to get download URL - try again.");
              setIsRegistering(false);
              setSignupFeedback('')
            });
        }
      );
    };
  
    const uploadNewUser = async (userImage, formData) => {
      setSignupFeedback('Creating your student account... [please be patient]');
      const updatedSignUpInfo = {
        ...formData,
        imageLink: userImage,
      };
      const response = await signUp(updatedSignUpInfo);
  
      if (response?.status != 200) {
        setRegisterError(response?.error);
        setIsRegistering(false);
        setSignupFeedback('')
        return;
      }
  
      const createdStudent = response?.user.data
  
      // save user details
      updateIsAuthenticated(true);
      updateStudent(createdStudent?.result);
      updateToken(createdStudent?.token);

      setSignupFeedback('Your account has been succesfuly created - routing you now')
  
      setIsRegistering(false);
      setSnackbarOpen(true);
  
      router.push("/portal/student");
    };
  
    useEffect(() => {
      setRegisterError("");
    }, [signUpInfo]);
  
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
              signupFeedback={signupFeedback}
            />
            {registerError && (
              <p className="selectFile stepThree">{registerError}</p>
            )}
          </div>
        </div>
      </div>
    );
  };



export default SignUpComp