import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import "./Styles/Eventbar.scss";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedData } from "../Redux/Event/Event.action";
import { getSingleEvent } from "../Redux/Event/Event.action";
import SingleEvent from "./SingleEvent";

const Eventbar = () => {
  const { user, token } = useSelector((store) => store.auth);
  const { allEvents } = useSelector((store) => store.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
      dispatch(getSearchedData(user.id, location.search, token));    
  }, [location]);

  const handleViewEvent = (id) => {
    dispatch(getSingleEvent(id, token));
    navigate(`/event/${id}`);
  };

  const handleSearch = () => {};
  useEffect(() => {
    let params = {
      category: searchParams.getAll("category"),
      name: inputValue,
    };
    setSearchParams(params);
  }, [inputValue, setSearchParams]);


  return (
    <>
      <Box className="postbar_container">
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type="text"
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Enter Event Name"
          />
          <InputRightElement width="4.5rem" border={"1px solid lightgrey"}>
            <BsSearch onClick={handleSearch} />
          </InputRightElement>
        </InputGroup>
      </Box>
      {allEvents && (allEvents?.map((event) => (
              <SingleEvent
                key={event._id}
                event={event}
                clickFun={handleViewEvent}
              />
            ))
          )}
    </>
  );
};

export default Eventbar;
