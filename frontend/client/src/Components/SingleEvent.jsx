import React from 'react'
import { Box, Flex } from '@chakra-ui/react';

const SingleEvent = ({event,clickFun}) => {

  const convertDate = (str) =>{
    let d = new Date(str);
    return `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`
}
  return (
    <Flex marginBlock={'.5rem'} boxShadow={'lg'} direction={'column'} gap='1rem' bgGradient='linear(to-r, #454545, #707070)' onClick={()=> clickFun(event._id)} className='single_event text' color='white'>
    <Flex justifyContent={'space-between'} >
        <Box className='single_event_inner' >{event.name}</Box>
        <Box className='single_event_inner' color='white'>{event.category}</Box>
    </Flex>
    <Flex justifyContent={'space-between'}>
        <Box className='single_event_inner' >{convertDate(event.timing)}</Box>
        <Box className='single_event_inner' color ='white' bgColor={event.isExpired ? "#ed3419" : "#30cb00"}>{event.isExpired ? 'Expired' : "Active"}</Box>
    </Flex>
</Flex>
  )
}

export default SingleEvent