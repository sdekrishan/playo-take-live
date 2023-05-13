import React, { useContext, useState } from "react";
import { images } from "../Container/index";
import "./Styles/Login.css";
import {
  BsFillEnvelopeFill,
  BsFillShieldLockFill,
  BsGenderAmbiguous,
} from "react-icons/bs";
import { useToast } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { signInUser, signUpUser } from "../Context/AuthContext/Auth.action";
import {
  SIGNIN_ERROR,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "../Context/AuthContext/Auth.ActionTypes";

const Login = () => {
  const [toggleSignOut, setToggleSignOut] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState({
    username: "",
    password: "",
  });
  //   const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const handleSignIn = () => {
    setToggleSignOut(false);
  };

  const handleSignOut = () => {
    setToggleSignOut(true);
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSignOutChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  const handleSignInButton = (e) => {
    e.preventDefault();
    dispatch({ type: SIGNIN_REQUEST });
    signInUser(loginForm)
      .then((res) => {
        dispatch({ type: SIGNIN_SUCCESS, payload: res.data });
        navigate("/home");
        return toast({
          title: "Login Successful.",
          description: "You've logged in successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        dispatch({ type: SIGNIN_ERROR });
        return toast({
          title: "Login Error.",
          description: `An Error Occured.`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const handleSignOutButton = (e) => {
    e.preventDefault();
    signUpUser(signupForm)
      .then((res) => {
        dispatch({ type: SIGNUP_SUCCESS });
        setToggleSignOut(false);
        return toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        dispatch({ type: SIGNUP_ERROR });
        return toast({
          title: "Error Occured.",
          description: "Something went Wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <>
      <div className={`container ${toggleSignOut ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={handleSignInButton}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <FiUser />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleSignInChange}
                  required
                />
              </div>
              <div className="input-field">
                <BsFillShieldLockFill />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleSignInChange}
                  required
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              {/* <p className="social-text">Or Sign in with social platforms</p> */}
            </form>
            <form className="sign-up-form" onSubmit={handleSignOutButton}>
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <FiUser />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleSignOutChange}
                  required
                />
              </div>

              <div className="input-field">
                <BsFillShieldLockFill />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleSignOutChange}
                />
              </div>

              <input type="submit" className="btn" value={"Sign Up"} />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>Let's Start with creating a Account first😎</p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={handleSignOut}
              >
                Sign up
              </button>
            </div>
            <img src={images.log} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already a member ?</h3>
              <p>Let's Start the game again.</p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={handleSignIn}
              >
                Sign in
              </button>
            </div>
            <img src={images.register} className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
