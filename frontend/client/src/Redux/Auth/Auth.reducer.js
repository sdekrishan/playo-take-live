import {
    LOGOUT,
    SIGNIN_ERROR,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
  } from "./Auth.actiontypes";
  
const initialState = {
    token: sessionStorage.getItem("prayo_token") || null,
    user: JSON.parse(sessionStorage.getItem("prayo_user")) || null
  }

  const AuthReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case SIGNUP_REQUEST: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case SIGNUP_SUCCESS: {
        return {
          ...state,
          isLoading: false,
        };
      }
      case SIGNUP_ERROR: {
        return {
          ...state,
          error: true,
        };
      }
      case SIGNIN_REQUEST: {
        return {
          ...state,
          loading: true,
        };
      }
      case SIGNIN_SUCCESS: {
        sessionStorage.setItem("prayo_token", payload.token);
        sessionStorage.setItem("prayo_user", JSON.stringify(payload.details));
        return {
          ...state,
          loading: false,
          isAuth: true,
          user: payload.details,
          token: payload.token,
        };
      }
      case SIGNIN_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
        };
      }
   
      case(LOGOUT):{
        sessionStorage.removeItem("prayo_user")
        sessionStorage.removeItem("prayo_token")
        return {
          ...state,
          token:null,
          user:null
        }
      }
     
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  