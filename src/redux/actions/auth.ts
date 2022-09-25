import axios from "axios";
import {
  REQUEST_AUTH,
  AUTH_FAILIED,
  AUTH_SUCCESS,
  SET_UNAUTHENTICATED,
  REQUEST_SIGNUP,
  START_VERIFICATION,
  EMAIL_VERIFIED,
  VERIFICATION_FAILED,
  FORGET_PASSWORD,
  FORGET_PASSWORD_FAILED,
  START_FORGET_PASSWORD,
} from "../types";
import { LoginData, SignupData } from "../types/types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const { REACT_APP_BACKEND } = process.env;

export const loginAction =
  (userData: LoginData) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: REQUEST_AUTH });

    axios
      .post(`${REACT_APP_BACKEND}/api/auth/login`, userData)
      .then((res) => {
        setAuthorization(res.data.token);
        dispatch({
          type: AUTH_SUCCESS,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: AUTH_FAILIED,
          payload: error.response?.data?.error,
        });
      });
  };

export const signupAction =
  (userData: SignupData) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: REQUEST_SIGNUP });

    axios
      .post(`${REACT_APP_BACKEND}/api/auth/signup`, userData)
      .then((res) => {
        setAuthorization(res.data.token);
        dispatch({
          type: AUTH_SUCCESS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log({ error: error.response });
        dispatch({
          type: AUTH_FAILIED,
          payload: error.response?.data?.error,
        });
      });
  };

export const verifyEmailAction =
  (token: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: START_VERIFICATION });
    axios
      .get(`${REACT_APP_BACKEND}/api/auth/verify?token=${token}`)
      .then((res) => {
        dispatch({
          type: EMAIL_VERIFIED,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: VERIFICATION_FAILED,
          payload: error.response?.data?.error,
        });
      });
  };

export const forgetPasswordAction =
  (email: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: START_FORGET_PASSWORD });
    axios
      .post(`${REACT_APP_BACKEND}/api/auth/forget`, { email })
      .then((res) => {
        dispatch({
          type: FORGET_PASSWORD,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FORGET_PASSWORD_FAILED,
          payload: error.response?.data?.error,
        });
      });
  };

export const resetPasswordAction =
  (token: string, passwordsData: any) =>
  (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: START_FORGET_PASSWORD });
    axios
      .put(`${REACT_APP_BACKEND}/api/auth/reset?token=${token}`, passwordsData)
      .then((res) => {
        dispatch({
          type: FORGET_PASSWORD,
          payload: { message: "Password reset successfully" },
        });
      })
      .catch((error) => {
        dispatch({
          type: FORGET_PASSWORD_FAILED,
          payload: error.response?.data?.error,
        });
      });
  };

export const setAuthorization = (token: string) => {
  const IdToken = token;
  localStorage.setItem("IdToken", IdToken);
  //seting authorization to the header axios
  axios.defaults.headers.common["token"] = IdToken;
};

export const logoutUser = () => (dispatch: Function) => {
  // set logout on backend later
  localStorage.removeItem("IdToken");
  delete axios.defaults.headers.common["token"];
  dispatch({ type: SET_UNAUTHENTICATED });
};
