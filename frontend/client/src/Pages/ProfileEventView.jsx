import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import Sidebar from '../Components/Sidebar';
import { getEvents, getSingleEvent } from '../Redux/Event/Event.action';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ProfileEventView = () => {
    const { allEvents,singleEvent } = useSelector((store) => store.event);
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const { id } = useParams();
    const event = singleEvent;
  
    useEffect(() => {
      dispatch(getSingleEvent(id))
    }, [allEvents]);
  
  
    const convertDate = (str) => {
      let d = new Date(str);
      return d.toLocaleDateString() + "at" + d.toLocaleTimeString();
    };
  
    console.log('singleEvent',singleEvent);
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
              {
                <Box>
                  <Text>Player's Request</Text>
                  <Box>
                    { event.receivedRequests && event.receivedRequests.map((player) => {
                      return <Box key={player._id} border='1px solid black'>
                        <Text>{player.username}</Text>
                        <Box>
                        <Button>Accept</Button>
                        <Button>Reject</Button>
                        </Box>
                      </Box>;
                    })}
                  </Box>
                </Box>
              }
            </Box>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </Box>
      </>
    );
}

export default ProfileEventView