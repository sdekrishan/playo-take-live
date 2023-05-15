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
import { BsPlusSquare, BsPeople, BsChat } from "react-icons/bs";
import {
  MdOutlineManageAccounts,
  MdOutlinePending,
  MdPersonSearch,
} from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FcSportsMode } from "react-icons/fc";
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
    name: "Accepted",
    route: "/accepted",
    icon: <AiOutlineCheckCircle />,
  },
  {
    name: "Applied",
    route: "/applied",
    icon: <MdOutlinePending />,
  },

  {
    name: "Manage",
    route: "/profile",
    icon: <MdOutlineManageAccounts />, //custom icon made for profile
  },
];

//links for small screen
const smallLinkBar = [
  {
    name: "Home",
    route: "/home",
    icon: <BiHomeAlt />,
  },
  {
    name: "Accepted",
    route: "/accepted",
    icon: <AiOutlineCheckCircle />,
  },
  {
    name: "Applied",
    route: "/applied",
    icon: <MdOutlinePending />,
  },

  {
    name: "Manage",
    route: "/profile",
    icon: <MdOutlineManageAccounts />, //custom icon made for profile
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const navigate = useNavigate();

  const handleClick = (el) => {
    setActive(el.route);
    navigate(`${el.route}`);
  };

  return (
    <div className="sidebar_container">
      <div className="sidebar_mainhead">
        <p className="sidebar_mainhead_text">Playo</p>
        <FcSportsMode size={"30px"}/>
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
      </div>

      {/* for small medium and small screen  */}

      <div className="sidebar_linkbar2" style={{ zIndex: "100" }}>
        {smallLinkBar.map((el, ind) => {
          return (
            <Box
              key={ind}
              onClick={() => handleClick(el)}
              justifyContent={"space-around"}
              alignItems="center"
              cursor="pointer"
              p="1rem"
              zIndex={"100"}
              borderRadius={"1rem"}
              bg={active === el.route ? "black" : "none"}
              color={active === el.route ? "white" : "black"}
            >
              <Box>{el.icon}</Box>
            </Box>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
