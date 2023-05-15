import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAcceptedEvents, getSingleEvent } from "../Redux/Event/Event.action";
import Sidebar from "../Components/Sidebar";
import { Box, Text } from "@chakra-ui/react";
import SingleEvent from "../Components/SingleEvent";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const AcceptedEvents = () => {
  const { acceptedEvents, isLoading } = useSelector((store) => store.event);
  const { user, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('inside use effect');
    dispatch(getAcceptedEvents(user.id, token));
  }, []);

  const handleViewEvent = (id) => {
    dispatch(getSingleEvent(id, token));
    navigate(`/event/${id}`);
  };

  console.log(acceptedEvents);
 
  return (
    <>
      <Sidebar />
      <Box ml={{base:0,sm:0,md:"25vw"}} paddingBlock={".5rem"}>
        {
          isLoading ? <Loader/> : <>
          <Text className="bighead" mb={"1rem"}>
          Accepted Events
        </Text>
        {acceptedEvents && acceptedEvents.length > 0 ? (
              acceptedEvents?.map((event) => (
                <SingleEvent
                  key={event._id}
                  event={event}
                  clickFun={handleViewEvent}
                />
              ))
            ) : (
              <h1 className="bighead">
                Wait for Organiser to Accept your request !
              </h1>
            )
        }
          </>
        }
      </Box>
    </>
  );
};

export default AcceptedEvents;
