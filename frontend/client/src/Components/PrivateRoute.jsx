import { useToast } from "@chakra-ui/toast";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((store) => store.auth);
  const toast = useToast();
  if (token) {
    return children;
  } else {
    toast({
      title: "Authentication failed.",
      description: "Please Login to visit the page.",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
