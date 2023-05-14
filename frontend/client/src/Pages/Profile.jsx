import React, { useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileEvents, getSingleEvent } from '../Redux/Event/Event.action'
import SingleEvent from '../Components/SingleEvent'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const dispatch =useDispatch();
  const {user} = useSelector(store => store.auth);
  const {profileEvents} = useSelector(store => store.event);
  const navigate = useNavigate()
  useEffect(()=>{
    dispatch(getProfileEvents(user.id))
  },[])

  const handleViewEvent = (id) => {
        dispatch(getSingleEvent(id))
        navigate(`/profile/event/${id}`)
    }

  return (
    <>
    <Sidebar/>
    <Box ml='25vw'>
    {profileEvents ? (
        <div className="postbar_container">
          {profileEvents.length > 0 ?
            profileEvents?.map((event) => (
                <SingleEvent key ={event._id} event={event} clickFun={handleViewEvent}/>
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
    </Box>
    </>
  )
}

export default Profile