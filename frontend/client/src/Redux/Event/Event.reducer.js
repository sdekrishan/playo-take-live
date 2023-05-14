import {
  APPLY_EVENT_SUCCESS,
    GET_EVENT_ERROR,
    GET_EVENT_REQUEST,
    GET_EVENT_SUCCESS,
    GET_OWN_EVENT_SUCCESS,
    GET_SINGLE_EVENT_ERROR,
    GET_SINGLE_EVENT_REQUEST,
    GET_SINGLE_EVENT_SUCCESS,
  } from "./Event.actiontypes";

const initialState = {
    allEvents: [],
    accepted: [],
    requested: [],
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

    
    
      default:
        return state;
    }
  };
  
  export default EventReducer;
  