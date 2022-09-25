import store from "..";

export interface SignupData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserData {
  id?: number | string;
  createdAt?: string;
  firstname?: string;
  lastname?: string;
  gender?: string;
  dob?: string;
  maritalStatus?: string;
  nationality?: string;
  profile?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Token {
  name: string;
  id: number;
  exp: number;
}

export interface UserStore {
  profile: UserData;
  users: UserData[];
  error: string | null;
  response: string | null;
  getUsersLoading: boolean;
  updateLoading: boolean | null;
  updateSuccess: boolean;
  profileProgress: number | null;
  profileLink: string;
  firebaseError: string;
}

export type RootState = ReturnType<typeof store.getState>;

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
