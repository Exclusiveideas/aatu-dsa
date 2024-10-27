import { Dispatch, SetStateAction } from "react";

export interface loginAltProps {
  changeAltLogin: (dir: string) => void;
  handleSubmit: (e, action: string) => void;
  loginError: string;
  setLoginError: Dispatch<SetStateAction>;
  toggleShow: boolean;
  settoggleShow: Dispatch<SetStateAction<boolean>>;
  gotoSignUp: () => void;
  islogging: boolean;
}

export interface forgotPassProps {
  changeAltLogin: (dir: string) => void;
  handleSubmit: (e, action: string) => void;
  loginError: string;
  setLoginError: Dispatch<SetStateAction>;
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
  updateToken: (token: string) => void;
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
  fullName: string;
  matric: string;
  email: string;
  faculty: string;
  programme: string;
  imageLink: string;
  level: string;
  gender: string;
  password: string;
  bedSpace: string | null;
  createdAt: string,
  updatedAt: string,
  OyshiaSubmitted?: boolean,
  OyshiaDetails?: OyshiaDetails,
  __v,
  _id: string | null;
}

export interface OyshiaDetails {
  surname: string;
  othername: string;
  sex: string;
  dob;
  maritalStatus: string;
  phoneNumber: Number;
  IDMeans: string;
  IDNumber: Number;
  matricNo: string;
  emailAddress: string;
  faculty: string;
  department: string;
  stateOfOrigin: string;
  lga: string;
  genotype: string;
  bloodGroup: string;
  medicalConditions: string;
  nextOfKinName: string;
  nextOfKinNumber: Number;
  nextOfKinAddress: string;
  oyshiaNumber?: Number;
}


export interface switchAltLoginProps {
  dir: string;
  stepsRef;
}