import axios from "axios";
import React from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../Redux/Event/Event.action";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

const SinglePageComponent = ({ event }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((store) => store.auth);
  const toast = useToast();
  
  const convertDate = (str) => {
    let d = new Date(str);
    return d.toLocaleDateString() + " at " + d.toLocaleTimeString();
  };

  const handleApplication = (eventId) => {
    axios
      .patch(
        `http://localhost:8080/event/request/${user.id}`,
        { eventId },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data === "successfully joined the game") {
          dispatch(getEvents(user.id, token));
          return toast({
            title: "Applied Successfully.",
            description: "Application has been successfully sent to organiser",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          return toast({
            title: "Application Failed.",
            description: "Some Error occured. Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        return toast({
          title: "Application Failed.",
          description: "You cannot join this event because members are full.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex direction={'column'} gap='.5rem'  bgGradient='linear(to-r, #454545, #707070)' color="white" padding={'1rem'} borderRadius={'.5rem'} boxShadow={'lg'}>
      {" "}
      <Flex justifyContent={'space-between'} >
        <Text className="single_event_inner_white">Name - {event.name}</Text>
        <Text className="single_event_inner_white"  bgColor={event.isExpired ? "#ed3419" : "#30cb00"}>Status - {event.isExpired ? "Expired" : "Active"}</Text>
      </Flex>

      <Text className="single_event_inner_white">Description - {event.description}</Text>
      <Text className="single_event_inner_white">Category - {event.category}</Text>
      <Text className="single_event_inner_white">Timings - {convertDate(event.timing)}</Text>
      <Text className="single_event_inner_white">Organised by - {event.organiser.username}</Text>

      {/* for total members  */}
      
      <Text className="single_event_inner_white">
        {" "}
        Members - {" "}
        {event.playingMembers === undefined ? 0 : event.playingMembers.length}/
        {event.membersLimit}
      </Text>

      {/* other skills section */}

      <Text className="bighead single_event_inner_white" color='white'>Other Skills - </Text>
        {event.otherReq ? (
          <Text className="single_event_inner_white">{event.otherReq}</Text>
        ) : (
          <Text className="bighead">No Other Requirements</Text>
        )}

      {/* if a user already applied then it will show "applied"
      if a event is expired then it will show "expired"
      if a evet has been accepted then it will show "accepted"
      otherwise it shows Apply option */}

      <Box 
      >
        {event.receivedRequests &&
        event.receivedRequests.find((el) => el._id === user.id) ? (
          <Button colorScheme="twitter" isDisabled>
            Applied
          </Button>
        ) : event.isExpired ? (
          <Button colorScheme="red" isDisabled>
            Event Expired
          </Button>
        ) : event.playingMembers.find((el) => el._id === user.id) ? (
          <Button colorScheme="whatsapp" isDisabled>
            Accepted
          </Button>
        ) : (
          <Button
            colorScheme="twitter"
            onClick={() => handleApplication(event._id)}
          >
            Apply
          </Button>
        )}
      </Box>

      {/* if a person is selected then it will show them the other's players */}
      {event.playingMembers &&
        event.playingMembers.find((el) => el._id === user.id) && (
          <>
            <Text className="bighead" color='white' textAlign={'left'}>Playing members</Text>
            <Flex direction='column' rowGap={'.5rem'}>
              {event.playingMembers.map((player, ind) => {
                return <Box className="single_event_inner_white" key={ind}>{player.username}</Box>;
              })}
            </Flex>
          </>
        )}
    </Flex>
  );
};

export default SinglePageComponent;
