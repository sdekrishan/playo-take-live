import {
    Box,
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    useDisclosure,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import {
    BsPlusSquare,
    BsPeople,
    BsChat,
  } from "react-icons/bs";
  import {MdOutlineManageAccounts, MdOutlinePending, MdPersonSearch} from 'react-icons/md'
  import { BiHomeAlt } from "react-icons/bi";
  import {AiOutlineCheckCircle} from "react-icons/ai"
  import {FcSportsMode} from 'react-icons/fc'
  import { useLocation, useNavigate } from "react-router-dom";
  import "./Styles/Sidebar.scss";

  
  //home links array 
  const linkbar = [
    {
      name: "Home",
      route: "/home",
      icon: <BiHomeAlt />,
    },
    {
      name: "Accepted Events",
      route: "/accepted",
      icon: <AiOutlineCheckCircle />,
    },
    {
      name: "Applied Events",
      route: "/requested",
      icon: <MdOutlinePending />,
    },
    
    {
      name: "Manage Events",
      route: "/profile",
      icon: <MdOutlineManageAccounts />,//custom icon made for profile 
    }
    
  ];
  
  //links for small screen
  const smallLinkBar = [
    {
      name: "Home",
      route: "/home",
      icon: <BiHomeAlt size={'20px'} />,
    },
    {
      name: "Accepted Events",
      route: "/friends",
      icon: <BsPeople size={'20px'} />,
    },
    {
      name:"Applied Events",
      route:"/chat",
      icon:<BsChat size={'20px'}/>
    },
    {
      name: "Profile",
      route: "/profile",
    //   icon: <ProfileIcon />,//custom icon made for profile 
    },
  
  ]
  
  const Sidebar = () => {
    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [active, setActive] = useState(location.pathname);
    // const { id, token } = useSelector((store) => store.auth);
    const [loading ,setLoading] = useState(false)
    const [content, setContent] = useState("");
    const [postImg, setPostImg] = useState("");
    const navigate = useNavigate();
    // const dispatch = useDispatch();
  
    const handleClick = (el) => {
      setActive(el.route);
      navigate(`${el.route}`);
    };
  
    const handleCreatePost = () => {
      setActive("Create Post");
      onOpen();
    };
  
    const handleContent = (e) => {
      setContent(e.target.value);
    };
  
    const handleImage = (e) => {
      setPostImg(e.target.files[0]);
    };
  
    const handleSearchBar = ()=>{
      navigate("/search")
    }
  
  
  
    return (
      <div className="sidebar_container" >
        <div className="sidebar_mainhead" >
          <p className="sidebar_mainhead_text">
            Playo
          </p>
          <FcSportsMode size={"25px"} color="red" />
          <div className="sidebar_search_div" onClick={handleSearchBar}>
          <MdPersonSearch size={'100%'}/>
          </div>
        </div>
        <div className="sidebar_linkdiv">
          {linkbar.map((el, ind) => {
            return (
              <Flex
                key={ind}
                onClick={() => handleClick(el)}
                justifyContent={"flex-start"}
                alignItems="center"
                mb={"1rem"}
                cursor="pointer"
                p=".5rem 1rem"
                borderRadius={"1rem"}
                bg={active === el.route ? "black" : "none"}
                color={active === el.route ? "white" : "black"}
              >
                <Box mr="1rem">{el.icon}</Box>
                <Text fontSize={"lg"}>{el.name}</Text>
              </Flex>
            );
          })}
          {/* <Box
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems="center"
            mb={"1rem"}
            cursor="pointer"
            p=".5rem 1rem"
            borderRadius={"1rem"}
            onClick={handleCreatePost}
            bg={active === "Create Post" ? "black" : "white"}
            color={active === "Create Post" ? "white" : "black"}
          >
            <Box mr="1rem">
              <BsPlusSquare />
            </Box>
            <Text fontSize={"lg"}>Create</Text>
          </Box> */}
        </div>
  
        {/* for small medium and small screen  */}
  
        <div className="sidebar_linkbar2" style={{zIndex:"100"}}>
          {smallLinkBar.map((el, ind) => {
            return (
              <Box
                key={ind}
                onClick={() => handleClick(el)}
                justifyContent={"space-around"}
                alignItems="center"
                cursor="pointer"
                p="1rem"
                zIndex={'100'}
                borderRadius={"1rem"}
                bg={active === el.route ? "black" : "none"}
                color={active === el.route ? "white" : "black"}
              >
                <Box >{el.icon}</Box>
              </Box>
            );
          })}
          <Box
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems="center"
            cursor="pointer"
            zIndex={'100'}
            borderRadius={"1rem"}
            onClick={handleCreatePost}
            bg={active === "Create Post" ? "black" : "white"}
            color={active === "Create Post" ? "white" : "black"}
          >
            <Box >
              <BsPlusSquare size={'20px'}/>
            </Box>
          </Box>
        </div>
  
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                placeholder={"Write Something about your post"}
                onChange={handleContent}
              />
              <Box
                border="1px solid lightgray"
                padding={"10px"}
                w="fit-content"
                borderRadius={"5px"}
              >
                <Input type="file" name="img" onChange={(e) => handleImage(e)} />
              </Box>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  };
  
  export default Sidebar;