import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import {
  Box,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileEvents,
  getSingleEvent,
} from "../Redux/Event/Event.action";
import SingleEvent from "../Components/SingleEvent";
import { useNavigate } from "react-router-dom";
import "./Styles/profile.css";
import FormComponent from "../Components/FormComponent";
import Loader from "../Components/Loader";

const Profile = () => {
  const dispatch = useDispatch();
  const { user,token } = useSelector((store) => store.auth);
  const { profileEvents,isLoading } = useSelector((store) => store.event);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  

  useEffect(() => {
    dispatch(getProfileEvents(user.id, token));
  }, []);

  const handleViewEvent = (id) => {
    dispatch(getSingleEvent(id, token));
    navigate(`/profile/event/${id}`);
  };
 

  return (
    <>
      <Sidebar />
      <Box  ml={{base:0,sm:0,md:"25vw"}} pt={{base:"4rem",sm:"4rem",md:"0"}}>
        {isLoading ? <Loader/> : <>
        <Box borderBottom={"2px solid lightgrey"} mb={"1rem"}>
          <Text
            className="form-text"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {!showForm ? "Open Form to Create Post" : "Close Form"}
          </Text>
          {showForm && <FormComponent />}
        </Box>
        <Text className="bighead">{user.username}'s Posts</Text>
        {profileEvents && profileEvents.length > 0 ? (
              profileEvents?.map((event) => (
                <SingleEvent
                  key={event._id}
                  event={event}
                  clickFun={handleViewEvent}
                />
              ))
            ) : (
              <h1 className="bighead">No Events now, Add to see them !</h1>
            )
        }
        </>}
      </Box>
    </>
  );
};

export default Profile;
