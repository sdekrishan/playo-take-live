import React from 'react'
import { getSingleEvent } from '../Redux/Event/Event.action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

const SingleEvent = ({event,clickFun}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const convertDate = (str) =>{
    let d = new Date(str);
    return d.toLocaleDateString()+"at"+d.toLocaleTimeString()
}

// const handleViewEvent = (id) => {
//     dispatch(getSingleEvent(id))
//     navigate(`/event/${id}`)
// }
  return (
    <Box onClick={()=> clickFun(event._id)} mb='1rem' border='1px solid black' borderRadius={'.5rem'} >
    <Flex justifyContent={'space-around'}>
        <Box>{event.name}</Box>
        <Box>{event.category}</Box>
    </Flex>
    <Flex justifyContent={'space-around'}>
        <Box>{convertDate(event.timing)}</Box>
        <Box color ={event.isExpired ? "red" : "green"}>{event.isExpired ? 'Expired' : "Active"}</Box>
    </Flex>
</Box>
  )
}

export default SingleEvent