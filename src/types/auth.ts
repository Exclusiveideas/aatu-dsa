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

export interface AuthState {
  isAuthenticated: boolean;
  student: Student | null;
  token: null | string;
  logout: () => void;
  updateIsAuthenticated: (isAuthenticated: boolean) => void;
  updateStudent: (student: Student) => void;
  updateToken: (token: string) => void;
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
