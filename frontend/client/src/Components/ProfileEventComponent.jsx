import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleEvent } from "../Redux/Event/Event.action";
import axios from "axios";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

const ProfileEventComponent = ({ event }) => {
  const { allEvents, singleEvent } = useSelector((store) => store.event);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getSingleEvent(id, token));
  }, [allEvents]);

  const convertDate = (str) => {
    let d = new Date(str);
    return d.toLocaleDateString() + "at" + d.toLocaleTimeString();
  };

  const acceptRequestFun = (id) => {
    axios
      .patch(
        `https://playo-take-live-829e-lyc526qm1-sdekrishan.vercel.app/event/accept/${id}`,
        {
          eventId: singleEvent._id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => dispatch(getSingleEvent(singleEvent._id, token)))
      .catch((err) => console.log(err));
  };

  const cancelRequestFun = (id) => {
    axios
      .patch(
        `https://playo-take-live-829e-lyc526qm1-sdekrishan.vercel.app/event/cancel/${id}`,
        {
          eventId: singleEvent._id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => dispatch(getSingleEvent(singleEvent._id, token)))
      .catch((err) => console.log(err));
  };

  console.log("singleEvent", event.receivedRequests);

  return (
    <Flex
      direction={"column"}
      gap=".5rem"
      bgGradient="linear(to-r, #454545, #707070)"
      color="white"
      padding={"1rem"}
      borderRadius={".5rem"}
      boxShadow={"lg"}
    >
      {" "}
      <Flex justifyContent={"space-between"}>
        <Text className="single_event_inner_white">Name - {event.name}</Text>
        <Text
          className="single_event_inner_white"
          bgColor={event.isExpired ? "#ed3419" : "#30cb00"}
        >
          Status - {event.isExpired ? "Expired" : "Active"}
        </Text>
      </Flex>
      <Text className="single_event_inner_white">
        Description - {event.description}
      </Text>
      <Text className="single_event_inner_white">
        Category - {event.category}
      </Text>
      <Text className="single_event_inner_white">
        Timings - {convertDate(event.timing)}
      </Text>
      <Text className="single_event_inner_white">
        Organised by - {event.organiser.username}
      </Text>
      {/* for total members  */}
      <Text className="single_event_inner_white">
        {" "}
        Members -{" "}
        {event.playingMembers === undefined ? 0 : event.playingMembers.length}/
        {event.membersLimit}
      </Text>
      {/* other skills section */}
      <Text className="bighead single_event_inner_white" color="white">
        Other Skills -{" "}
      </Text>
      {event.otherReq ? (
        <Text className="single_event_inner_white">{event.otherReq}</Text>
      ) : (
        <Text className="bighead">No Other Requirements</Text>
      )}
      <Box>
        {
          <Box>
            <Text className="bighead single_event_inner_white" color="white">
              Player's Request
            </Text>
            <Box>
              {event.receivedRequests && event.receivedRequests.length > 0 ? (
                event.receivedRequests.map((player) => {
                  return (
                    <Flex
                      key={player._id}
                      border="1px solid white"
                      borderRadius={".5rem"}
                      justifyContent={"space-between"}
                      p="1rem"
                      alignItems={"center"}
                    >
                      <Text textAlign={"left"}>{player.username}</Text>
                      <Flex gap="1rem">
                        <Button
                          onClick={() => acceptRequestFun(player._id)}
                          colorScheme="whatsapp"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() => cancelRequestFun(player._id)}
                          colorScheme="red"
                        >
                          Reject
                        </Button>
                      </Flex>
                    </Flex>
                  );
                })
              ) : (
                <Text className="bighead" color="white">
                  No one has Applied yet !
                </Text>
              )}
            </Box>
          </Box>
        }
      </Box>
    </Flex>
  );
};

export default ProfileEventComponent;
