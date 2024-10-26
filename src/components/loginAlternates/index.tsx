import React, { useRef } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { forgotPassProps, loginAltProps } from "@/types/auth";
import { FACULTY_LIST, PROGRAMMES_LIST } from "@/utils/constant";

import '../../app/portal/auth/auth.css';
import { validateResetPasswordVals } from "@/utils/authFunctions";

export const Login = ({
  changeAltLogin,
  handleSubmit,
  setLoginError,
  toggleShow,
  settoggleShow,
  loginError,
  gotoSignUp,
  islogging,
}: loginAltProps) => {

    const preHandleSubmit = (e) => {
        e.preventDefault();
        handleSubmit(e, 'login');
    }

  return (
    <>
      <form onSubmit={preHandleSubmit}>
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
        <p className="forgotPassText" onClick={() => changeAltLogin('next')}>
          Forgot your password? click here.
        </p>
      </form>
    </>
  );
};





export const ForgotPassword = ({
    changeAltLogin,
    handleSubmit,
    setLoginError,
    loginError,
    islogging,
  }: forgotPassProps) => {
    const [faculty, setFaculty] = React.useState('');
    const [programme, setProgramme] = React.useState('');
    const [toggleShow, settoggleShow] = React.useState(false);

    const passRef = useRef(null);
    const confPassRef = useRef(null);
    

    const handleFacultyChange = (event: {
      target: { value: React.SetStateAction<string> };
    }) => {
      setFaculty(event.target.value);
    };

    const handleProgrameChange = (event: {
      target: { value: React.SetStateAction<string> };
    }) => {
      setProgramme(event.target.value);
    };

    const preHandleSubmit = (e) => {
        e.preventDefault();

        
        const password = passRef?.current.value;
        const confirmPassword = confPassRef?.current.value;

        if (password !== confirmPassword) {
          setLoginError("Passwords do not match");
          return;
        }
        

        const resetPassVals = {
          fullName: e.target[0].value,
          matric: e.target[1].value,
          email: e.target[2].value,
          faculty: faculty,
          programme: programme,
        }
        const validated = validateResetPasswordVals(resetPassVals, password, setLoginError);

        if(!validated) return;


        handleSubmit({...resetPassVals, newPassword: password}, 'resetPass');
    }


    return (
      <>
        <form onSubmit={preHandleSubmit}>
          <div className="formInput">
            <input
              onFocus={() => setLoginError("")}
              placeholder="Full Name"
              required
              className="inputBox"
            />
          </div>
          <div className="formInput">
            <input
              onFocus={() => setLoginError("")}
              placeholder="Matric No. / Reg No."
              required
              className="inputBox"
            />
          </div>
          <div className="formInput">
            <input
              onFocus={() => setLoginError("")}
              placeholder="School email / Personal email"
              required
              className="inputBox"
            />
          </div>
          <div className="formInput">
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="faculty-select-label">Faculty</InputLabel>
              <Select
                labelId="faculty-select-label"
                id="faculty-select"
                value={faculty}
                label="faculty"
                onChange={handleFacultyChange}
                onFocus={() => setLoginError("")}
              >
                {FACULTY_LIST?.map((faculty, index) => (
                  <MenuItem key={index} value={faculty}>
                    {faculty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="formInput">
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="programme-select-label">Programme</InputLabel>
              <Select
                labelId="programme-select-label"
                id="programme-select"
                value={programme}
                label="programme"
                onChange={handleProgrameChange}
                onFocus={() => setLoginError("")}
              >
                {PROGRAMMES_LIST?.map((programme, index) => (
                  <MenuItem key={index} value={programme}>
                    {programme}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            ref={passRef}
            onFocus={() => setLoginError("")}
        />
          </div>
          <div className="formInput thirdFormInput">
        <input
            placeholder="Confirm Password"
            type={toggleShow ? "text" : "password"}
            required
            className="inputBox"
            ref={confPassRef}
            onFocus={() => setLoginError("")}
        />
          </div>
          {loginError && <p className="selectFile">{loginError}</p>}
          <div className="formBtns">
            <div className="authBtn alternate" onClick={() => changeAltLogin('back')}>
              Sign In
            </div>
            <button className="authBtn" type="submit">
              {islogging ? (
                  <CircularProgress size="13px" className="circularProgress" />
              ) : (
                <p>Reset Password</p>
              )}
            </button>
          </div>
        </form>
      </>
    );
  }