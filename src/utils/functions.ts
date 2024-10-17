export const setRef = (element: any, index: number, stepsRef: any) => {
  stepsRef.current[index] = element;
};

export function handleTransition(prevStep: any, dir: any, stepsRef: any, createUser: any) {
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

export const nextProcess = (stepsRef: any, setSignUpStep: any, createUser: any) => {
  const stepsLen = stepsRef.current?.length;
  setSignUpStep((prevStep: number) => {
    handleTransition(prevStep - 1, "next", stepsRef, createUser);

    if (prevStep < stepsLen) return prevStep + 1;
    else return prevStep;
  });
};

export const prevProcess = (stepsRef: any, setSignUpStep: any, createUser: any) => {
  setSignUpStep((prevStep: number) => {
    handleTransition(prevStep, "prev", stepsRef, createUser);

    if (prevStep > 1) return prevStep - 1;
    else return prevStep;
  });
};

export const uploadNewUser = () => {
  // console.log("user created");
};



export const handleAuthTypeTransition = (authImgRef: any, moveableWrapRef: any, authLogin: boolean) => {
  if (!authImgRef.current || !moveableWrapRef.current) return;

  if (!authLogin) {
    authImgRef.current.style.left = "100%";
    moveableWrapRef.current.style.left = "-100%";
  } else {
    authImgRef.current.style.left = "0";
    moveableWrapRef.current.style.left = "0";
  }
};


export function validateStepOne( updatedInfo: any, setFormErr: any ) {
  const { fullName, matric, email, programme, level } = updatedInfo;

  // Full Name validation
  if (fullName.length < 5) {
    setFormErr('Full Name is required');
    return false;
  }
  if (!/^[a-zA-Z\s]+$/.test(fullName)) {
    setFormErr('Full Name can only contain letters and spaces');
    return false;
  }

  // Matric Number validation
  if (matric === '') {
    setFormErr('Matric Number is required');
    return false;
  }
  // Check if the input contains only digits and slashes
  if (!/^[\d/]+$/.test(matric) || matric.length < 8) {
    setFormErr('Matric Number should be in right format');
    return false;
  }

  // Email validation
  if (email === '') {
    setFormErr('Email is required');
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFormErr('Please enter a valid email address');
    return false;
  }

  // University Programme validation
  if (programme === '' || programme.length < 5) {
    setFormErr('Correct University Programme is required');
    return false;
  }

  // Current Level validation
  if (level === '') {
    alert('Current Level is required');
    return false;
  }
  
  const validLevels = ['100', '200', '300', '400', '500'];

  if(!validLevels.includes(level)) {
    setFormErr('Invalid programme level.')
    return false;
  }

  // If all checks pass
  return true
}

export function validateStepThree(password: string, confirmPassword: string, setPassErr: any ) {

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
  if (password !== confirmPassword) {
    setPassErr('Passwords do not match');
    return false;
  }

  // If all checks pass
  return true;
}