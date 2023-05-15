import axios from "axios";
import {
  LOGOUT,
  SIGNIN_ERROR,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./Auth.actiontypes";

export const signUpUser = (form) => (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  return axios
    .post("https://playo-backend-ifau.onrender.com/register", form)
    .then((res) => dispatch({ type: SIGNUP_SUCCESS }))
    .catch((err) => dispatch({ type: SIGNUP_ERROR }));
};

export const signInUser = (form) => (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });
  return axios
    .post("https://playo-backend-ifau.onrender.com/login", form)
    .then((res) => dispatch({ type: SIGNIN_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: SIGNIN_ERROR }));
};
