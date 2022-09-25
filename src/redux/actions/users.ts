import axios from "axios";
import {
  GET_ONE_USER_FAILED,
  GET_SELF_PROFILE,
  REQUEST_UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  REQUEST_UPLOAD_PROFILE,
  UPLOAD_PROFILE,
  UPLOAD_PROFILE_FAILED,
} from "../types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { UserData } from "../types/types";
import { storage } from "../../firebase/config";

const { REACT_APP_BACKEND } = process.env;

export const getSelfProfile =
  () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    axios
      .get(`${REACT_APP_BACKEND}/api/users/me`)
      .then((res) => {
        dispatch({
          type: GET_SELF_PROFILE,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ONE_USER_FAILED,
          payload: err.response?.data,
        });
      });
  };

export const updateUser =
  (userData: UserData) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: REQUEST_UPDATE_USER });
    axios
      .put(`${REACT_APP_BACKEND}/api/users/update`, userData)
      .then((res) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_USER_FAILED,
          payload: error.response?.data?.error,
        });
      });
  };

export const uploadProfileImage = (file: any) => (dispatch: Function) => {
  const storageRef = storage.ref(file?.name);
  storageRef.put(file).on(
    "state_changed",
    (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      dispatch({
        type: REQUEST_UPLOAD_PROFILE,
        payload: percentage.toFixed(2),
      });
    },
    (error) => {
      console.log(error);
      dispatch({ type: UPLOAD_PROFILE_FAILED });
    },
    async () => {
      const url = await storageRef.getDownloadURL();
      dispatch(updateUser({profile: url}))
      dispatch({
        type: UPLOAD_PROFILE,
        payload: url,
      });
    }
  );
};
