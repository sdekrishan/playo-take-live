import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAcceptedEvents,
  getAppliedEvents,
  getSingleEvent,
} from "../Redux/Event/Event.action";
import Sidebar from "../Components/Sidebar";
import { Box, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";
import SingleEvent from "../Components/SingleEvent";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const AppliedEvents = () => {
  const { appliedEvents, isLoading } = useSelector((store) => store.event);
  const { user,token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAppliedEvents(user.id, token));
  }, []);

  const handleViewEvent = (id) => {
    dispatch(getSingleEvent(id, token));
    navigate(`/event/${id}`);
  };
  return (
    <>
      <Sidebar />
      <Box  ml={{base:0,sm:0,md:"25vw"}} paddingBlock={".5rem"} >
      {isLoading ? <Loader/> : <Box >
        <Text className="bighead" mb="1rem">
          Requested/Applied Events
        </Text>
        {appliedEvents && appliedEvents.length > 0 ? (
              appliedEvents?.map((event) => (
                <SingleEvent
                  key={event._id}
                  event={event}
                  clickFun={handleViewEvent}
                />
              ))
            ) : (
              <h1 className="bighead">Applied atleast one to see Events !</h1>
            )
         }
      </Box>}
      </Box>
    </>
  );
};

export default AppliedEvents;
