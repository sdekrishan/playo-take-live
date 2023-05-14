import {
    GET_ACCEPTED_EVENT_SUCCESS,
    GET_EVENT_ERROR,
    GET_EVENT_REQUEST,
    GET_EVENT_SUCCESS,
    GET_OWN_EVENT_SUCCESS,
    GET_REQUESTED_EVENT_SUCCESS,
    GET_SINGLE_EVENT_SUCCESS,
  } from "./Event.actiontypes";

import axios from 'axios';

export const getEvents = (id) => dispatch => {
    dispatch({type:GET_EVENT_REQUEST})
    return axios.get(`http://localhost:8080/event/all/${id}`)
    .then(res => dispatch({type:GET_EVENT_SUCCESS,payload:res.data}))
    .catch(err => dispatch({type:GET_EVENT_ERROR}))
}
  
  export const getRequestedEvents =(id)=> dispatch =>{
    dispatch({type:GET_EVENT_REQUEST})

    return axios.get(`http://localhost:8080/event/applied/${id}`)
    .then(res => dispatch({type:GET_REQUESTED_EVENT_SUCCESS,payload:res.data}))
    .catch(err => dispatch({type:GET_EVENT_ERROR}))
  }
  
  export const getAcceptedEvents =(id)=> dispatch =>{
    dispatch({type:GET_EVENT_REQUEST})

    return axios.get(`http://localhost:8080/event/selected/${id}`)
    .then(res => dispatch({type:GET_ACCEPTED_EVENT_SUCCESS,payload:res.data}))
    .catch(err => dispatch({type:GET_EVENT_ERROR}))
  }
  
  export const getSingleEvent = (id) => dispatch => {
    dispatch({type:GET_EVENT_REQUEST})

    return axios.get(`http://localhost:8080/event/single/${id}`)
    .then(res => dispatch({type:GET_SINGLE_EVENT_SUCCESS,payload:res.data}))
    .catch(err => dispatch({type:GET_EVENT_ERROR}))
  }


  export const getProfileEvents = (id) => dispatch => {
    return axios.get(`http://localhost:8080/event/own/${id}`)
  .then(res => dispatch({type:GET_OWN_EVENT_SUCCESS,payload:res.data}))
  .catch(err => dispatch({type:GET_EVENT_ERROR}))
  }