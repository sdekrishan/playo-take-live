import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { Box,  Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleEvent,
} from "../Redux/Event/Event.action";
import SinglePageComponent from "../Components/SinglePageComponent";
import Loader from "../Components/Loader";

const SinglePageEvent = () => {
  const { allEvents, singleEvent } = useSelector((store) => store.event);
  const dispatch = useDispatch();
  const { id } = useParams();
  const event = singleEvent;
  const { token } = useSelector((store) => store.auth);
  
  useEffect(() => {
    dispatch(getSingleEvent(id, token));
  }, [allEvents]);

  console.log("event", event);
  return (
    <>
      <Sidebar />
      <Box  ml={{base:0,sm:0,md:"25vw"}} padding={"1rem"}>
        
        {event.name ? (
          <SinglePageComponent event={singleEvent} />
        ) : (
          <Loader/>
        )}
      </Box>
    </>
  );
};

export default SinglePageEvent;
