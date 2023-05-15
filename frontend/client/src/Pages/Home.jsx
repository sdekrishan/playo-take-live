import "./Styles/Home.css";
import Sidebar from "../Components/Sidebar";
import FilterComponent from "../Components/FilterComponent";
import Eventbar from "../Components/Eventbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "../Redux/Event/Event.action";

const Home = () => {
  const {token,user} = useSelector(store => store.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getEvents(user.id,token))
  },[])
  return (
    <>
      <Sidebar />
      <div className="maindiv">
        <div className="postdiv">
          <Eventbar />
        </div>
        <div className="chatdiv">
          <FilterComponent />
        </div>
      </div>
    </>
  );
};

export default Home;