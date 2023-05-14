import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyforEvent, getEvents, getSingleEvent } from "../Redux/Event/Event.action";
import axios from "axios";

const SinglePageEvent = () => {
  // const { state, dispatch } = useContext(AppContext);
  const { allEvents,singleEvent } = useSelector((store) => store.event);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  // const [event, setEvents] = useState({});
  const event = singleEvent;

  useEffect(() => {
    dispatch(getSingleEvent(id))
  }, [allEvents]);


  const convertDate = (str) => {
    let d = new Date(str);
    return d.toLocaleDateString() + "at" + d.toLocaleTimeString();
  };

  const handleApplication = (eventId) => {
    axios.patch(`http://localhost:8080/event/request/${user.id}`,{eventId})
  .then(res => dispatch(getEvents(user.id)))
  .catch(err => console.log(err) )
  };
  return (
    <>
      <Sidebar />
      <Box ml="25vw" border="1px solid black" padding={"1rem"}>
        {event.name ? (
          <>
            {" "}
            <Flex>
              <Text>{event.name}</Text>
              <Text>{event.isExpired ? "Expired" : "Active"}</Text>
            </Flex>
            <Text>{event.category}</Text>
            <Text>{convertDate(event.timing)}</Text>
            <Text>
              {" "}
              Members :{" "}
              {event.playingMembers === undefined
                ? 0
                : event.playingMembers.length}
              /{event.membersLimit}
            </Text>
            <Text>Other Skills</Text>
            <Box>
              {event.otherReq !== undefined ? (
                event.otherReq.map((skill, ind) => {
                  return <Text key={ind}>{skill}</Text>;
                })
              ) : (
                <Text className="bighead">No Other Requirements</Text>
              )}
            </Box>
            <Box>
              { event.isExpired ? 
              (
                <Button colorScheme="red" isDisabled>
                  Event Expired
                </Button>
              ) :
              event.receivedRequests && event.receivedRequests.includes(user.id) ? (
                <Button colorScheme="twitter" isDisabled>
                  Applied
                </Button>
              ) : (
                <Button colorScheme="twitter" onClick={()=>handleApplication(event._id)}>
                  Apply
                </Button>
              )}
            </Box>
            {event.playingMembers && event.playingMembers.includes(user.id) && (
              <>
                <Text>Playing members</Text>
                <Box>
                  {event.playingMembers.map((player) => {
                    return <Box>{player.username}</Box>;
                  })}
                </Box>
              </>
            )}
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </Box>
    </>
  );
};

export default SinglePageEvent;
