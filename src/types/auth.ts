import { Dispatch, SetStateAction } from "react";

export interface loginAltProps {
  changeAltLogin: (dir: String) => void;
  handleSubmit: (e, action: String) => void;
  loginError: String;
  setLoginError: Dispatch<SetStateAction<string>>;
  toggleShow: boolean;
  settoggleShow: Dispatch<SetStateAction<boolean>>;
  gotoSignUp: () => void;
  islogging: boolean;
}

export interface forgotPassProps {
  changeAltLogin: (dir: String) => void;
  handleSubmit: (e, action: String) => void;
  loginError: String;
  setLoginError: Dispatch<SetStateAction<string>>;
  toggleShow: boolean;
  settoggleShow: Dispatch<SetStateAction<boolean>>;
  islogging: boolean;
}


export interface loginData {
  matric: String;
  password: String;
}

export interface signUpData {
  fullName: String;
  matric: String;
  email: String;
  programme: String;
  imgLink: String;
  password: String;
}

export interface signUpCompProps {
  signUpStep: number;
  setSignUpStep: Dispatch<SetStateAction<number>>;
  setAuthLogin: Dispatch<SetStateAction<boolean>>,
  router;
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>;
}

export interface AuthState {
  isAuthenticated: boolean;
  student: Student | null;
  token: null | string;
  logout: () => void;
  updateIsAuthenticated: (isAuthenticated: boolean) => void;
  updateStudent: (student: Student) => void;
  updateToken: (token: String) => void;
}

export interface PortalState {
  mobileNavbarOpen: boolean;
  changePicModalOpen: boolean,
  changeImageSelected: boolean,
  toggleMobileNavbar: () => void;
  toggleChangePicModal: (e: boolean) => void
  toggleImageSelected: (e: boolean) => void
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
  OyshiaSubmitted?: boolean,
  OyshiaDetails?: OyshiaDetails,
  __v,
  _id: String | null;
}

export interface OyshiaDetails {
  surname: String;
  othername: String;
  sex: String;
  dob;
  maritalStatus: String;
  phoneNumber: Number;
  IDMeans: String;
  IDNumber: Number;
  matricNo: String;
  emailAddress: String;
  faculty: String;
  department: String;
  stateOfOrigin: String;
  lga: String;
  genotype: String;
  bloodGroup: String;
  medicalConditions: String;
  nextOfKinName: String;
  nextOfKinNumber: Number;
  nextOfKinAddress: String;
  oyshiaNumber?: Number;
}


export interface switchAltLoginProps {
  dir: String;
  stepsRef;
}