import { Dispatch, SetStateAction } from "react";

export interface loginAltProps {
  changeAltLogin: (dir: string) => void;
  handleSubmit: (e: any, action: string) => void;
  loginError: string;
  setLoginError: Dispatch<SetStateAction<string>>;
  toggleShow: boolean;
  settoggleShow: Dispatch<SetStateAction<boolean>>;
  gotoSignUp: () => void;
  islogging: boolean;
}

export interface forgotPassProps {
  changeAltLogin: (dir: string) => void;
  handleSubmit: (e: any, action: string) => void;
  loginError: string;
  setLoginError: Dispatch<SetStateAction<string>>;
  toggleShow: boolean;
  settoggleShow: Dispatch<SetStateAction<boolean>>;
  islogging: boolean;
}


export interface loginData {
  matric: string;
  password: string;
}

export interface signUpData {
  fullName: string;
  matric: string;
  email: string;
  programme: string;
  imgLink: string;
  password: string;
}

export interface signUpCompProps {
  signUpStep: number;
  setSignUpStep: Dispatch<SetStateAction<number>>;
  setAuthLogin: Dispatch<SetStateAction<boolean>>,
  router: any;
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>;
}

export interface AuthState {
  isAuthenticated: boolean;
  student: Student | null;
  token: null | string;
  logout: () => void;
  updateIsAuthenticated: (isAuthenticated: boolean) => void;
  updateStudent: (student: Student) => void;
  updateToken: (token: string) => void;
}

export interface PortalState {
  mobileNavbarOpen: boolean;
  changePicModalOpen: boolean,
  toggleMobileNavbar: () => void;
  toggleChangePicModal: () => void
}

export interface Student {
  fullName: String;
  matric: String;
  email: String;
  faculty: String;
  programme: String;
  imageLink: String;
  level: String;
  gender: String;
  password: String;
  bedSpace: String | null;
  createdAt: String,
  updatedAt: String,
  __v: any,
  _id: String | null;
}




export interface switchAltLoginProps {
  dir: string;
  stepsRef: any;
}