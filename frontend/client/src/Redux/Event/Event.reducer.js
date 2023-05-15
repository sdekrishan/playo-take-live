import {
  APPLY_EVENT_SUCCESS,
    GET_ACCEPTED_EVENT_SUCCESS,
    GET_EVENT_ERROR,
    GET_EVENT_REQUEST,
    GET_EVENT_SUCCESS,
    GET_OWN_EVENT_SUCCESS,
    GET_REQUESTED_EVENT_SUCCESS,
    GET_SINGLE_EVENT_REQUEST,
    GET_SINGLE_EVENT_SUCCESS,
    POST_EVENT_SUCCESS,
  } from "./Event.actiontypes";

const initialState = {
    allEvents: [],
    acceptedEvents: [],
    appliedEvents: [],
    profileEvents: [],
    isLoading: false,
    isError: false,
    singleEvent:{}
  };

  const EventReducer = (state = initialState, { type, payload }) => {
    switch (type) {
    
      case(GET_EVENT_REQUEST):{
        return {
          ...state,
          isLoading:true,
        }
      }
      case(GET_EVENT_SUCCESS):{
        return {
          ...state,
          isLoading:false,
          allEvents:payload
        }
      }
      case(GET_EVENT_ERROR):{
        return {
          ...state,
          isError:true
        }
      }
      case(GET_SINGLE_EVENT_REQUEST):{
        return {
          ...state,
          isLoading:true,
        }
      }
      case(GET_SINGLE_EVENT_SUCCESS):{
        return {
          ...state,
          isLoading:false,
          singleEvent:payload
        }
      }
    case(GET_OWN_EVENT_SUCCESS):{
      return {
        ...state,
        isLoading:false,
        profileEvents:payload
      }
    }
    case(GET_REQUESTED_EVENT_SUCCESS):{
      return {
        ...state,
        isLoading:false,
        requestedEvents:payload
      }
    }
    case(GET_ACCEPTED_EVENT_SUCCESS):{
      return {
        ...state,
        isLoading:false,
        acceptedEvents:payload
      }
    }
    case(APPLY_EVENT_SUCCESS):{
      return {
        ...state,
        isLoading:false,
        appliedEvents:payload
      }
    }
    case(POST_EVENT_SUCCESS):{
      return {
        ...state,
        isLoading:false,
        profileEvents : [payload,...state.profileEvents]
      }
    }
      default:
        return state;
    }
  };
  
  export default EventReducer;
  