import {
  APPLY_EVENT_SUCCESS,
  GET_ACCEPTED_EVENT_SUCCESS,
  GET_EVENT_ERROR,
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
  GET_OWN_EVENT_SUCCESS,
  GET_REQUESTED_EVENT_SUCCESS,
  GET_SINGLE_EVENT_SUCCESS,
  POST_EVENT_SUCCESS,
} from "./Event.actiontypes";

import axios from "axios";

export const getEvents = (id, token) => (dispatch) => {
  dispatch({ type: GET_EVENT_REQUEST });
  return axios
    .get(`https://playo-backend-ifau.onrender.com/event/all/${id}`, {
      headers: {
        authorization: token,
      },
    })
    .then((res) => dispatch({ type: GET_EVENT_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: GET_EVENT_ERROR }));
};

export const getAppliedEvents = (id, token) => (dispatch) => {
  dispatch({ type: GET_EVENT_REQUEST });
  return axios
    .get(`https://playo-backend-ifau.onrender.com/event/applied/${id}`, {
      headers: {
        authorization: token,
      },
    })
    .then((res) => dispatch({ type: APPLY_EVENT_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: GET_EVENT_ERROR }));
};

export const getAcceptedEvents = (id, token) => (dispatch) => {
  dispatch({ type: GET_EVENT_REQUEST });
  return axios
    .get(`https://playo-backend-ifau.onrender.com/event/selected/${id}`, {
      headers: {
        authorization: token,
      },
    })
    .then((res) =>
      dispatch({ type: GET_ACCEPTED_EVENT_SUCCESS, payload: res.data })
    )
    .catch((err) => dispatch({ type: GET_EVENT_ERROR }));
};

export const getSingleEvent = (id, token) => (dispatch) => {
  dispatch({ type: GET_EVENT_REQUEST });

  return axios
    .get(`https://playo-backend-ifau.onrender.com/event/single/${id}`, {
      headers: {
        authorization: token,
      },
    })
    .then((res) =>
      dispatch({ type: GET_SINGLE_EVENT_SUCCESS, payload: res.data })
    )
    .catch((err) => dispatch({ type: GET_EVENT_ERROR }));
};

export const getProfileEvents = (id, token) => (dispatch) => {
  dispatch({ type: GET_EVENT_REQUEST });
  return axios
    .get(`https://playo-backend-ifau.onrender.com/event/own/${id}`, {
      headers: {
        authorization: token,
      },
    })
    .then((res) => dispatch({ type: GET_OWN_EVENT_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: GET_EVENT_ERROR }));
};

export const getSearchedData = (id, query, token) => (dispatch) => {
  dispatch({ type: GET_EVENT_REQUEST });
  return axios
    .get(
      `https://playo-backend-ifau.onrender.com/event/search/${id}/${query}`,
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((res) => dispatch({ type: GET_EVENT_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: GET_EVENT_ERROR }));
};

export const postEvent = (id, form, token) => (dispatch) => {
  dispatch({ type: GET_EVENT_REQUEST });
  return axios
    .post(`https://playo-backend-ifau.onrender.com/event/${id}/`, form, {
      headers: {
        authorization: token,
      },
    })
    .then((res) =>
      dispatch({ type: POST_EVENT_SUCCESS, payload: res.data.event })
    )
    .catch((err) => dispatch({ type: GET_EVENT_ERROR }));
};
