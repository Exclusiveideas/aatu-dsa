export const setRef = (element: any, index: number, stepsRef: any) => {
  stepsRef.current[index] = element;
};

export function handleTransition(prevStep: any, dir: any, stepsRef: any) {
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

export const nextProcess = (stepsRef: any, setSignUpStep: any) => {
  const stepsLen = stepsRef.current?.length;
  setSignUpStep((prevStep: number) => {
    handleTransition(prevStep - 1, "next", stepsRef);

    if (prevStep < stepsLen) return prevStep + 1;
    else return prevStep;
  });
};

export const prevProcess = (stepsRef: any, setSignUpStep: any) => {
  setSignUpStep((prevStep: number) => {
    handleTransition(prevStep, "prev", stepsRef);

    if (prevStep > 1) return prevStep - 1;
    else return prevStep;
  });
};

export const uploadNewUser = () => {
  // console.log("user created");
};
