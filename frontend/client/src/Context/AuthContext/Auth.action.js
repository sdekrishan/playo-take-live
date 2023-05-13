import {
    SIGNIN_ERROR,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
  } from "./Auth.ActionTypes";
  import axios from "axios";


  export const signUpUser = (form) => {
    return axios.post(`http://localhost:8080/register`, form)
  };
  

export const signInUser = (form) => {
    return axios.post("http://localhost:8080/login",form)
}