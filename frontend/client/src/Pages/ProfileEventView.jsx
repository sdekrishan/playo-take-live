import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { getSingleEvent } from "../Redux/Event/Event.action";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileEventComponent from "../Components/ProfileEventComponent";

const ProfileEventView = () => {
  const { allEvents, singleEvent } = useSelector(
    (store) => store.event
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getSingleEvent(id, token));
  }, [allEvents]);

  return (
    <>
      <Sidebar />
      <Box
        ml={{ base: 0, sm: 0, md: "25vw" }}
        p="1rem"
        direction={"column"}
        gap=".5rem"
        color="white"
        borderRadius={".5rem"}
        boxShadow={"lg"}
      >
        {singleEvent.name && <ProfileEventComponent event={singleEvent} />}
      </Box>
    </>
  );
};

export default ProfileEventView;
