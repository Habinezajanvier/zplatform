/* eslint-disable import/no-anonymous-default-export */

import {
  REQUEST_AUTH,
  AUTH_FAILIED,
  AUTH_SUCCESS,
  SET_UNAUTHENTICATED,
  REQUEST_SIGNUP,
  START_VERIFICATION,
  EMAIL_VERIFIED,
  VERIFICATION_FAILED,
  START_FORGET_PASSWORD,
  FORGET_PASSWORD,
  FORGET_PASSWORD_FAILED,
} from "../types";
const initialState = {
  authenticated: false,
  user: {},
  error: null,
  success: false,
  message: null,
  loading: false,
  verificationLoading: false,
  verificationResponse: null,
  verificationError: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return {
        ...state,
        error: null,
        message: null,
        loading: true,
      };
    case REQUEST_SIGNUP:
      return {
        ...state,
        error: null,
        message: null,
        loading: true,
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
        authenticated: true,
        user: action.payload.data
      };

    case AUTH_FAILIED:
      return {
        ...state,
        error: action.payload,
        authenticated: false,
        loading: false,
        message: action.payload.message,
      };

    case SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
      };
    case START_VERIFICATION:
      return {
        ...state,
        verificationLoading: true,
      };
    case EMAIL_VERIFIED:
      return {
        ...state,
        verificationLoading: false,
        verificationResponse: action.payload.message,
      };
    case VERIFICATION_FAILED:
      return {
        ...state,
        verificationLoading: false,
        verificationError: action.payload.error,
      };
      case START_FORGET_PASSWORD:
        return {
          ...state,
          error: null,
          success: false,
          message: null,
          loading: true,
        };
  
      case FORGET_PASSWORD:
        return {
          ...state,
          message: action.payload.message,
          loading: false,
          success: true,
        };
  
      case FORGET_PASSWORD_FAILED:
        return {
          ...state,
          error: action.payload,
          loading: false,
          message: action.payload.message,
        };
    default:
      return state;
  }
};
