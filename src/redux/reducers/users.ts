/* eslint-disable import/no-anonymous-default-export */
import {
  GET_ONE_USER,
  GET_ONE_USER_FAILED,
  GET_SELF_PROFILE,
  REQUEST_GET_ONE_USER,
  REQUEST_UPDATE_USER,
  REQUEST_UPLOAD_PROFILE,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPLOAD_PROFILE,
  UPLOAD_PROFILE_FAILED,
} from "../types";
import { UserStore } from "../types/types";

const initialState: UserStore = {
  profile: {},
  users: [],
  error: null,
  response: null,
  getUsersLoading: false,
  updateLoading: null,
  updateSuccess: false,
  profileProgress: null,
  profileLink: "",
  firebaseError: "",
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SELF_PROFILE:
      return {
        ...state,
        error: null,
        response: null,
        profile: action.payload,
      };

    case REQUEST_GET_ONE_USER:
      return {
        ...state,
        error: null,
        response: null,
        getUsersLoading: true,
      };

    case GET_ONE_USER:
      return {
        ...state,
        getUsersLoading: false,
        response: action.payload.message,
        profile: action.payload.data,
      };

    case GET_ONE_USER_FAILED:
      return {
        ...state,
        getUsersLoading: false,
        error: action.payload.error,
      };
    case REQUEST_UPDATE_USER:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateLoading: null,
        response: action.payload.message,
        updateSuccess: true,
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        updateLoading: null,
        error: action.payload.error,
        updateSuccess: false,
      };
    case REQUEST_UPLOAD_PROFILE:
      return {
        ...state,
        profileProgress: action.payload,
      };
    case UPLOAD_PROFILE:
      return {
        ...state,
        profileLink: action.payload,
        profileProgress: null,
      };
    case UPLOAD_PROFILE_FAILED:
      return {
        ...state,
        profileProgress: null,
      };
    default:
      return state;
  }
};
