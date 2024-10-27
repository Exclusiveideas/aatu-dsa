import { switchAltLoginProps } from "@/types/auth";
import { FACULTY_LIST, PROGRAMMES_LIST } from "./constant";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/firebaseConfig";
import { v4 as uuidv4 } from "uuid";





export const setRef = (element, index: number, stepsRef) => {
  stepsRef.current[index] = element;
};

export function handleTransition(prevStep: number, dir: string, stepsRef, createUser: () => void) {
  const stepsLen = stepsRef.current?.length;

  if (dir == "next") {
    if (prevStep == stepsLen) {
      createUser();
      return;
    }

    // scale down the prev step
    if (!stepsRef.current[prevStep]) return;
    stepsRef.current[prevStep].style.transform = "scale(0)";
    stepsRef.current[prevStep].style.opacity = "0";

    //slide in the next step

    if (!stepsRef.current[prevStep + 1]) return;

    stepsRef.current[prevStep + 1].style.opacity = "1";
    if (prevStep + 1 == 1) stepsRef.current[prevStep + 1].style.right = "0";
    if (prevStep + 1 == 2) stepsRef.current[prevStep + 1].style.left = "0";
  } else {
    if (prevStep == 1) return;

    //slide out the prev step
    if (!stepsRef.current[prevStep - 1]) return;

    stepsRef.current[prevStep - 1].style.opacity = "0";
    if (prevStep == 2) stepsRef.current[prevStep - 1].style.right = "100%";
    if (prevStep == 3) stepsRef.current[prevStep - 1].style.left = "100%";

    // scale up the next step
    if (!stepsRef.current[prevStep - 2]) return;

    stepsRef.current[prevStep - 2].style.transform = "scale(1)";
    stepsRef.current[prevStep - 2].style.opacity = "1";
  }
}

export const nextProcess = (stepsRef, setSignUpStep, createUser) => {
  const stepsLen = stepsRef.current?.length;
  setSignUpStep((prevStep: number) => {
    handleTransition(prevStep - 1, "next", stepsRef, createUser);

    if (prevStep < stepsLen) return prevStep + 1;
    else return prevStep;
  });
};

export const prevProcess = (stepsRef, setSignUpStep, createUser) => {
  setSignUpStep((prevStep: number) => {
    handleTransition(prevStep, "prev", stepsRef, createUser);

    if (prevStep > 1) return prevStep - 1;
    else return prevStep;
  });
};

export const uploadNewUser = () => {
  // console.log("user created");
};



export const handleAuthTypeTransition = (authImgRef, moveableWrapRef, authLogin: boolean) => {
  if (!authImgRef.current || !moveableWrapRef.current) return;

  if (!authLogin) {
    authImgRef.current.style.left = "100%";
    moveableWrapRef.current.style.left = "-100%";
  } else {
    authImgRef.current.style.left = "0";
    moveableWrapRef.current.style.left = "0";
  }
};


export function validateStepOne( updatedInfo, setFormErr ) {
  const { fullName, matric, email, programme, faculty } = updatedInfo;

  // Full Name validation
  if (fullName.length < 5) {
    setFormErr('Full Name is required.');
    return false;
  }
  if (!/^[a-zA-Z\s]+$/.test(fullName)) {
    setFormErr('Full Name can only contain letters and spaces.');
    return false;
  }

  // Matric Number validation
  if (matric === '' || matric.length < 8) {
    setFormErr('Correct Matric or Reg Number is required.');
    return false;
  }


  // Email validation
  if (email === '') {
    setFormErr('Email is required');
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFormErr('Please enter a valid email address.');
    return false;
  }

  // University Faculty validation
  if (faculty === '') {
    setFormErr('University faculty is required.');
    return false;
  }
  

  if(!FACULTY_LIST.includes(faculty)) {
    setFormErr('Invalid faculty level.')
    return false;
  }


  // University Programme validation
  if (programme === '') {
    setFormErr('University Programme is required.');
    return false;
  }

  if(!PROGRAMMES_LIST.includes(programme)) {
    setFormErr('Invalid programme level.')
    return false;
  }

  // If all checks pass
  return true
}

export function validateStepThree(level: string, gender: string, password: string, setPassErr ) {

  // level validation
  if (!level) {
    setPassErr('Your current Level is required');
    return false;
  }
  
  const validLevels = ['100', '200', '300', '400', '500', 'spillover'];

  if(!validLevels.includes(level)) {
    setPassErr('Invalid programme level.')
    return false;
  }

  // gender validation
  if (gender === '') {
    setPassErr('Your gender is required');
    return false;
  }
  
  const validGenders = ['male', 'female'];

  if(!validGenders.includes(gender)) {
    setPassErr('Invalid programme level.')
    return false;
  }


  // Password validation
  if (password === '') {
    setPassErr('Password is required');
    return false;
  }
  if (password.length < 5) {
    setPassErr('Password must be at least 5 characters long');
    return false;
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    setPassErr('Password must contain both letters and numbers');
    return false;
  }

  // If all checks pass
  return true;
}


export function validateAllInfo( finalFormData, setRegisterError ) {
  const { fullName, matric, email, faculty, programme, level, gender, password } = finalFormData;

  const stepOneVal = validateStepOne({ fullName, matric, email, programme, faculty }, setRegisterError);
  if(!stepOneVal) return false;
  
  const stepThreeVal = validateStepThree( level, gender, password , setRegisterError);
  if(!stepThreeVal) return false;

  return true;
}



export function switchAltLogin({ dir, stepsRef }: switchAltLoginProps ) {

  if (dir == "next") {

    // scale down the prev step
    if (!stepsRef.current[0]) return;
    stepsRef.current[0].style.transform = "scale(0)";
    stepsRef.current[0].style.opacity = "0";

    //slide in the next step

    if (!stepsRef.current[1]) return;

    stepsRef.current[1].style.opacity = "1";
    stepsRef.current[1].style.left = "0";
  } else {

    //slide out the prev step
    if (!stepsRef.current[1]) return;

    stepsRef.current[1].style.opacity = "0";
    stepsRef.current[1].style.left = "100%";

    // scale up the next step
    if (!stepsRef.current[0]) return;

    stepsRef.current[0].style.transform = "scale(1)";
    stepsRef.current[0].style.opacity = "1";
  }
}



export const validateResetPasswordVals = (props, password: string, setLoginError) => {
   // Password validation
   if (password === "") {
     setLoginError("Password is required");
     return false;
   }
   if (password.length < 5) {
     setLoginError("Password must be at least 5 characters long");
     return false;
   }
   if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
     setLoginError("Password must contain both letters and numbers");
     return false;
   }

  return validateStepOne(props, setLoginError);
}




export const uploadPic = (uploadImage, sucessFunc, failFunc, setIsUploading) => {

  const storageRef = ref(storage, `studentPictures/${uuidv4()}`);
  const uploadTask = uploadBytesResumable(storageRef, uploadImage);

  

  uploadTask.on(
    "state_changed",
    null,
    () => {
      failFunc("Image upload failed - try again.")
      setIsUploading(false)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          sucessFunc(downloadURL);
          // uploadNewUser(downloadURL, formData);
        })
        .catch(() => {
          failFunc("Failed to get download URL - try again.")
          setIsUploading(false)
          // setIsRegistering(false);
        });
    }
  );
};