import { Box, Flex, Input, InputGroup, InputRightElement, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import "./Styles/Eventbar.scss";
import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../Redux/Event/Event.action";
import { getSingleEvent } from "../Redux/Event/Event.action";
import SingleEvent from "./SingleEvent";

const Eventbar = () => {

    const {user} = useSelector(store => store.auth);
    const {allEvents} = useSelector(store => store.event) 
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getEvents(user.id))
    },[])

    const handleViewEvent = (id) => {
        dispatch(getSingleEvent(id))
        navigate(`/event/${id}`)
    }

  return (
    <>
    <Box>
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type="text"
        placeholder='Enter Event Name'
      />
      <InputRightElement width='4.5rem' border={'1px solid lightgrey'}>
        <BsSearch/>
      </InputRightElement>
    </InputGroup>

    </Box>
      {allEvents ? (
        <div className="postbar_container">
          {allEvents.length > 0 ?
            allEvents?.map((event) => (
                <SingleEvent key ={event._id} event={event} clickFun = {handleViewEvent}/>
            ))
            : <h1 className="bighead">No Events now, Keep in touch</h1>
          }
        </div>
      ) : (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      )}
    </>
  );
};

export default Eventbar;